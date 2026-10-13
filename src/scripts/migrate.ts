/**
 * Applique les migrations de `src/migrations` avant `next build` (voir le script "build" du package.json).
 *
 * Lancé directement avec tsx, et non avec `payload migrate` ni `payload run`, car la CLI Payload :
 * - sort parfois en code 0 sans rien exécuter (Node 22), ce qui laisserait `next build` partir sur une base non migrée ;
 * - pose une question sur stdin (et bloque le build) si `payload_migrations` contient la ligne "dev" (batch -1)
 *   laissée par un `bun dev` lancé sur cette base ;
 * - échoue si la table `payload_migrations` n'existe pas.
 *
 * RÈGLE DU SOCLE (BASELINE) : les migrations "initial" de décembre 2025 ne sont pas rejouables (CREATE TYPE et
 * CREATE TABLE sans garde, `down` en DROP TABLE ... CASCADE) et ne décrivent plus le schéma réel. Elles ne sont
 * exécutées que sur une base totalement vide. Sur une base qui contient déjà le schéma de l'application, elles sont
 * seulement inscrites dans `payload_migrations` comme déjà appliquées, quel que soit le contenu de cette table.
 * Une base ni vide ni complète fait échouer le build : dans le doute, on n'exécute rien.
 *
 * Ici : aucune question, la ligne "dev" est ignorée et laissée telle quelle, et une migration n'est enregistrée
 * qu'une fois. Le code 0 n'est possible qu'après la dernière ligne de log ("Migrations applied: N" ou
 * "No migration to apply.") ; toute erreur ou sortie prématurée donne un code non nul : le build s'arrête et
 * l'ancien conteneur continue de servir le site.
 *
 * À savoir :
 * - `bun run build` ÉCRIT donc dans la base désignée par DATABASE_URI (fichiers .env compris) : ne pas builder en
 *   local avec le DATABASE_URI de production, et donner leur propre base aux éventuels déploiements de preview.
 * - Toute nouvelle migration doit être idempotente et additive (ADD COLUMN IF NOT EXISTS...) : elle s'exécute sur la
 *   production pendant que l'ancien build tourne encore dessus. Relire ce que `payload migrate:create` génère.
 * - Chaque migration reçoit son propre numéro de batch. Ne jamais lancer `payload migrate:down` (ni refresh, reset,
 *   fresh) sur la production : les `down` suppriment des tables, des colonnes et du contenu.
 */
// Imports statiques uniquement : un `await import()` au premier niveau fait sortir Node 22 en code 13 par intermittence
import './load-env'
import config from '@payload-config'
import { type PostgresAdapter, sql } from '@payloadcms/db-postgres'
import {
	commitTransaction,
	createLocalReq,
	getPayload,
	initTransaction,
	killTransaction,
	type PayloadRequest,
} from 'payload'
import { migrations } from '../migrations'

// Migrations du socle, par leur nom. Liste figée : ne jamais y ajouter une nouvelle migration.
const BASELINE = ['20251223_115806_initial', '20251223_130451_initial', '20251223_130726_initial']

// Tables créées par le socle et toujours utilisées : toutes présentes = le schéma de l'application est déjà là.
const BASELINE_TABLES = [
	'categories',
	'landing',
	'landing_about_stats',
	'landing_adaptation_badges',
	'landing_charter_section_items',
	'landing_daily_schedule_section_items',
	'landing_equipment_section_items',
	'landing_family_members',
	'landing_hero_buttons',
	'landing_objectives_section_items',
	'landing_organization_bag_items',
	'landing_organization_nounou_items',
	'landing_sleep_tags',
	'landing_trainings_section_items',
	'media',
	'payload_kv',
	'payload_locked_documents',
	'payload_locked_documents_rels',
	'payload_preferences',
	'payload_preferences_rels',
	'posts',
	'posts_rels',
	'users',
	'users_sessions',
]

// Le socle doit rester en tête de `src/migrations/index.ts`, dans l'ordre, et rien d'autre ne peut porter ses noms
const names = migrations.map(migration => migration.name)
if (BASELINE.some((name, i) => names[i] !== name) || new Set(names).size !== names.length) {
	throw new Error(`src/migrations/index.ts must start with the baseline migrations, once each: ${BASELINE.join(', ')}`)
}

// Payload vide tout le schéma à la connexion quand cette variable est définie, quel que soit NODE_ENV : jamais depuis un build
if (process.env.PAYLOAD_DROP_DATABASE) {
	throw new Error('PAYLOAD_DROP_DATABASE is set: no migration, no build.')
}

// Jamais de "push" du schéma depuis ce script, quel que soit NODE_ENV
process.env.PAYLOAD_MIGRATING = 'true'

const payload = await getPayload({ config, disableOnInit: true })
const adapter = payload.db as unknown as PostgresAdapter

type Db = PostgresAdapter['drizzle']
let applied = 0

async function transaction(run: (db: Db, req: PayloadRequest) => Promise<void>): Promise<void> {
	const req = await createLocalReq({}, payload)
	await initTransaction(req)

	try {
		const db = adapter.sessions[String(await req.transactionID)].db

		// Ne jamais attendre longtemps un verrou (et bloquer le site derrière) : mieux vaut échouer et relancer.
		// Le verrou consultatif sérialise deux déploiements simultanés.
		await db.execute(sql`
      SET LOCAL lock_timeout = '3s';
      SELECT pg_advisory_xact_lock(hashtext('payload_migrations'));
    `)
		await run(db, req)
		await commitTransaction(req)
	} catch (err) {
		await killTransaction(req)
		throw err
	}
}

// Applique (ou, avec `execute: false`, inscrit seulement) la migration si elle n'est pas déjà enregistrée.
// `recorded` : lignes de `payload_migrations`, ou [] tant que la table n'existe pas.
async function apply(
	migration: (typeof migrations)[number],
	execute: boolean,
	recorded: { batch?: null | number; name?: null | string }[],
	db: Db,
	req: PayloadRequest
): Promise<void> {
	if (recorded.some(doc => doc.name === migration.name)) return

	// Un batch par migration (dernier + 1, la ligne "dev" en batch -1 ne compte pas) :
	// un `migrate:down` ne déferait ainsi que la dernière migration, jamais tout l'historique d'un coup
	const batch = Math.max(0, ...recorded.map(doc => Number(doc.batch))) + 1

	if (execute) {
		payload.logger.info(`Migrating: ${migration.name}`)
		await migration.up({ db, payload, req })
		applied++
	} else {
		payload.logger.warn(`Baseline: ${migration.name} recorded as already applied, NOT executed`)
	}

	await payload.create({ collection: 'payload-migrations', data: { name: migration.name, batch }, req })
	recorded.push({ name: migration.name, batch })
}

const findRecorded = async (req: PayloadRequest) =>
	(await payload.find({ collection: 'payload-migrations', limit: 0, pagination: false, req })).docs

// 1. Le socle, en une seule transaction : exécuté sur une base vide, seulement inscrit sur une base existante
await transaction(async (db, req) => {
	// Toutes les tables de la base, tous schémas confondus ; `visible` = celle que désigne le nom sans schéma,
	// c'est-à-dire celle que lisent Payload et les migrations
	const { rows: tables } = await db.execute<{ name: string; schema: string; visible: boolean }>(sql`
    SELECT n.nspname AS "schema", c.relname AS "name", to_regclass(quote_ident(c.relname)) = c.oid AS "visible"
    FROM pg_catalog.pg_class c
    JOIN pg_catalog.pg_namespace n ON n.oid = c.relnamespace
    WHERE c.relkind IN ('r', 'p')
      AND n.nspname NOT IN ('pg_catalog', 'information_schema')
      AND n.nspname !~ '^pg_(toast|temp)';
  `)
	const baseline = migrations.slice(0, BASELINE.length)

	// Base totalement vide (aucune table, pas même `payload_migrations`) : seul cas où le socle s'exécute.
	// La première migration crée elle-même `payload_migrations`.
	if (tables.length === 0) {
		payload.logger.info('Empty database: running the baseline migrations')
		const recorded: { batch: number; name: string }[] = []
		for (const migration of baseline) await apply(migration, true, recorded, db, req)
		return
	}

	const missing = BASELINE_TABLES.filter(name => !tables.some(table => table.visible && table.name === name))
	if (missing.length > 0) {
		throw new Error(
			`Refusing to migrate: the database is neither empty (${tables.length} tables, e.g. "${tables[0].schema}"."${tables[0].name}") ` +
				`nor a complete application schema (${missing.length} of ${BASELINE_TABLES.length} baseline tables missing: ${missing.join(', ')}). ` +
				'Baseline migrations only run on an empty database. Nothing was executed.'
		)
	}

	// Même définition que celle générée par Payload (cf. snapshots .json)
	if (!tables.some(table => table.visible && table.name === 'payload_migrations')) {
		await db.execute(sql`
      CREATE TABLE "payload_migrations" (
        "id" serial PRIMARY KEY NOT NULL,
        "name" varchar,
        "batch" numeric,
        "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
        "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
      );
      CREATE INDEX "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
      CREATE INDEX "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");
    `)
	}
	const recorded = await findRecorded(req)
	for (const migration of baseline) await apply(migration, false, recorded, db, req)
})

// 2. Les migrations suivantes (additives et idempotentes), chacune dans sa transaction
for (const migration of migrations.slice(BASELINE.length)) {
	await transaction(async (db, req) => apply(migration, true, await findRecorded(req), db, req))
}

payload.logger.info(applied ? `Migrations applied: ${applied}` : 'No migration to apply.')
await payload.destroy()
// Sortie explicite, en toute dernière instruction : sans elle le processus reste en vie et le build ne se termine pas
process.exit(0)
