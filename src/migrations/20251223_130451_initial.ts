import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_landing_hero_buttons_variant" AS ENUM('primary', 'secondary');
  CREATE TABLE "landing_hero_buttons" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL,
  	"url" varchar NOT NULL,
  	"variant" "enum_landing_hero_buttons_variant" DEFAULT 'primary'
  );
  
  ALTER TABLE "landing" ADD COLUMN "hero_title" varchar DEFAULT 'Isabelle Cinquin' NOT NULL;
  ALTER TABLE "landing" ADD COLUMN "hero_subtitle" varchar DEFAULT 'Assistante Maternelle au bord du Lac Léman';
  ALTER TABLE "landing_hero_buttons" ADD CONSTRAINT "landing_hero_buttons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."landing"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "landing_hero_buttons_order_idx" ON "landing_hero_buttons" USING btree ("_order");
  CREATE INDEX "landing_hero_buttons_parent_id_idx" ON "landing_hero_buttons" USING btree ("_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "landing_hero_buttons" CASCADE;
  ALTER TABLE "landing" DROP COLUMN "hero_title";
  ALTER TABLE "landing" DROP COLUMN "hero_subtitle";
  DROP TYPE "public"."enum_landing_hero_buttons_variant";`)
}
