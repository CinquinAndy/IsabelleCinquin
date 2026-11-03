/**
 * Remplit une base JETABLE avec l'instantané du contenu (contenu.json et medias/), par l'API locale de Payload.
 *
 *   NODE_ENV=development bun x tsx e2e/instantane/semer.ts
 *
 * - Refuse toute base qui n'est pas locale (localhost, 127.0.0.1 ou le service « postgres » de la CI) : la base de
 *   production n'est jamais visée, ni en lecture ni en écriture.
 * - Le schéma est créé par Payload lui-même (« push » hors production), comme dans la CI : les migrations « initial »
 *   de décembre 2025 ne recréent pas tout le schéma d'une base neuve (voir src/scripts/migrate.ts). Le build lancé
 *   ensuite passe quand même par migrate.ts, qui inscrit le socle et applique les migrations suivantes.
 * - Les médias passent par le plugin de stockage S3 configuré (un faux S3 local en test), comme en production.
 * - Aucun appel externe : sans FORVOYEZ_TOKEN ni REVALIDATE_SECRET, les hooks des médias et de revalidation
 *   s'arrêtent d'eux-mêmes.
 */
import { readFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import config from '@payload-config'
import { getPayload } from 'payload'

const ICI = path.dirname(fileURLToPath(import.meta.url))
const HOTES_AUTORISES = new Set(['localhost', '127.0.0.1', '::1', 'postgres'])

const uri = process.env.DATABASE_URI ?? ''
let hote = ''
try {
	hote = new URL(uri).hostname.replace(/^\[|\]$/g, '')
} catch {
	// adresse illisible : refusée ci-dessous
}
if (!HOTES_AUTORISES.has(hote)) {
	console.error(`semer.ts : DATABASE_URI doit viser une base locale jetable (hôte reçu : « ${hote || 'aucun'} »).`)
	process.exit(1)
}
if (process.env.NODE_ENV !== 'development') {
	console.error('semer.ts : lancer avec NODE_ENV=development (Payload crée alors le schéma de la base vide).')
	process.exit(1)
}
for (const cle of ['FORVOYEZ_TOKEN', 'REVALIDATE_SECRET', 'GEMINI_API_KEY', 'RESEND_API_KEY']) {
	if (process.env[cle]) {
		console.error(`semer.ts : ${cle} doit être vide pendant le semis (aucun appel externe).`)
		process.exit(1)
	}
}

interface MediaInstantane {
	id: number
	fichier: string
	alt: string | null
}
interface Instantane {
	medias: MediaInstantane[]
	categories: { id: number; name: string; slug: string }[]
	posts: ({ id: number } & Record<string, unknown>)[]
	landing: Record<string, unknown>
}

const contenu = JSON.parse(readFileSync(path.join(ICI, 'contenu.json'), 'utf8')) as Instantane
// Hors production, Payload régénère src/payload-types.ts au démarrage : pas pendant un semis.
const configuration = await config
configuration.typescript.autoGenerate = false
const payload = await getPayload({ config: configuration })

const deja = await payload.count({ collection: 'media' })
if (deja.totalDocs > 0) {
	console.error('semer.ts : la base contient déjà des médias. Repartir d’une base vide.')
	process.exit(1)
}

const ids = { media: new Map<number, number>(), categorie: new Map<number, number>() }

// Remplace les références "media:<id>" et "categorie:<id>" de l'instantané par les identifiants de cette base.
function relier<T>(valeur: T): T {
	if (typeof valeur === 'string') {
		const m = /^(media|categorie):(\d+)$/.exec(valeur)
		if (!m) return valeur
		const cible = ids[m[1] as 'media' | 'categorie'].get(Number(m[2]))
		if (cible === undefined) throw new Error(`référence sans document : ${valeur}`)
		return cible as T
	}
	if (Array.isArray(valeur)) return valeur.map(relier) as T
	if (valeur && typeof valeur === 'object') {
		return Object.fromEntries(Object.entries(valeur).map(([k, v]) => [k, relier(v)])) as T
	}
	return valeur
}

for (const media of contenu.medias) {
	const doc = await payload.create({
		collection: 'media',
		data: { alt: media.alt },
		filePath: path.join(ICI, 'medias', media.fichier),
	})
	if (doc.filename !== media.fichier) throw new Error(`média renommé par Payload : ${media.fichier} → ${doc.filename}`)
	ids.media.set(media.id, doc.id)
}

for (const { id, ...categorie } of contenu.categories) {
	const doc = await payload.create({ collection: 'categories', data: categorie })
	ids.categorie.set(id, doc.id)
}

for (const { id: _id, ...post } of contenu.posts) {
	await payload.create({ collection: 'posts', data: relier(post) as never })
}

await payload.updateGlobal({ slug: 'landing', data: relier(contenu.landing) as never })

console.log(
	`Base semée : ${ids.media.size} médias, ${ids.categorie.size} catégories, ${contenu.posts.length} article(s), global landing.`
)
process.exit(0)
