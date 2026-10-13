import { type MigrateDownArgs, type MigrateUpArgs, sql } from '@payloadcms/db-postgres'

// Payload 3.85.1 -> 3.90.2 : deux colonnes ajoutées par Payload lui-même.
// - media._objectkey : champ `_objectKey` de @payloadcms/plugin-cloud-storage (utilisé par storage-s3)
// - users.reset_password_requested_at : champ d'auth `resetPasswordRequestedAt` (forgotPassword.minRequestInterval)
// Colonnes nullables sans valeur par défaut : aucune réécriture de table, et le build précédent continue de fonctionner.
//
// `payload migrate:create` proposait bien plus (DROP TABLE "tags", DROP COLUMN, changements de type...) : les snapshots
// de décembre 2025 étaient en retard sur la config. Ces instructions ne sont volontairement PAS ici : la base de
// production est déjà au schéma de la config. Le snapshot .json de cette migration est le vrai schéma 3.90.2.
export async function up({ db }: MigrateUpArgs): Promise<void> {
	await db.execute(sql`
    ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "reset_password_requested_at" timestamp(3) with time zone;
    ALTER TABLE "media" ADD COLUMN IF NOT EXISTS "_objectkey" varchar;
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
	await db.execute(sql`
    ALTER TABLE "media" DROP COLUMN IF EXISTS "_objectkey";
    ALTER TABLE "users" DROP COLUMN IF EXISTS "reset_password_requested_at";
  `)
}
