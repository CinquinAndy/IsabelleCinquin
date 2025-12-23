import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "landing" ADD COLUMN "contact_section_title" varchar DEFAULT 'Envie de me rencontrer ?';
  ALTER TABLE "landing" ADD COLUMN "contact_section_content" varchar DEFAULT 'N''hésitez pas à me contacter pour discuter de l''accueil de votre enfant';`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "landing" DROP COLUMN "contact_section_title";
  ALTER TABLE "landing" DROP COLUMN "contact_section_content";`)
}
