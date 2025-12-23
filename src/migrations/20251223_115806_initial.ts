import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_posts_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_landing_objectives_section_items_icon" AS ENUM('baby', 'hand-helping', 'utensils', 'heart-pulse', 'shield-check', 'star', 'sun', 'home', 'book-open', 'palette');
  CREATE TYPE "public"."enum_landing_adaptation_badges_color" AS ENUM('pink', 'violet', 'amber', 'emerald');
  CREATE TABLE "users_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "users" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE "media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"alt" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric
  );
  
  CREATE TABLE "posts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"excerpt" varchar NOT NULL,
  	"content" jsonb NOT NULL,
  	"featured_image_id" integer NOT NULL,
  	"is_important" boolean DEFAULT false,
  	"status" "enum_posts_status" DEFAULT 'draft',
  	"published_at" timestamp(3) with time zone,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "posts_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"categories_id" integer,
  	"tags_id" integer
  );
  
  CREATE TABLE "categories" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "tags" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_kv" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar NOT NULL,
  	"data" jsonb NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer,
  	"media_id" integer,
  	"posts_id" integer,
  	"categories_id" integer,
  	"tags_id" integer
  );
  
  CREATE TABLE "payload_preferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "payload_migrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "landing_about_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" numeric NOT NULL,
  	"suffix" varchar,
  	"label" varchar NOT NULL
  );
  
  CREATE TABLE "landing_family_members" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer NOT NULL,
  	"first_name" varchar NOT NULL,
  	"last_name" varchar,
  	"description" varchar NOT NULL,
  	"link" varchar
  );
  
  CREATE TABLE "landing_trainings_section_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"period" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "landing_sleep_tags" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "landing_living_place_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer NOT NULL
  );
  
  CREATE TABLE "landing_equipment_section_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"quantity" numeric
  );
  
  CREATE TABLE "landing_objectives_section_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar,
  	"icon" "enum_landing_objectives_section_items_icon" DEFAULT 'star',
  	"content" jsonb
  );
  
  CREATE TABLE "landing_adaptation_badges" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL,
  	"color" "enum_landing_adaptation_badges_color" DEFAULT 'pink'
  );
  
  CREATE TABLE "landing_organization_bag_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"item" varchar NOT NULL
  );
  
  CREATE TABLE "landing_organization_nounou_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"item" varchar NOT NULL
  );
  
  CREATE TABLE "landing_daily_schedule_section_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"time" varchar,
  	"activity" varchar NOT NULL
  );
  
  CREATE TABLE "landing_charter_section_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"rule_number" numeric NOT NULL,
  	"title" varchar,
  	"content" varchar
  );
  
  CREATE TABLE "landing" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"about_badge" varchar DEFAULT 'À propos',
  	"about_title" varchar DEFAULT 'Nounou sur Sciez',
  	"about_title_accent" varchar DEFAULT 'depuis 2003',
  	"about_content" jsonb,
  	"about_image_id" integer,
  	"introduction_title" varchar DEFAULT 'Livret d''Accueil de Nounou',
  	"introduction_content" jsonb,
  	"introduction_image_id" integer,
  	"presentation_title" varchar DEFAULT 'Ma présentation',
  	"presentation_content" jsonb,
  	"presentation_agreement_info" varchar DEFAULT 'Mon agrément me permet d''accueillir 3 enfants le jour de 7h à 19h et un enfant la nuit de 18h à 7h.',
  	"trainings_section_title" varchar DEFAULT 'Mes formations',
  	"sleep_title" varchar DEFAULT 'Le sommeil',
  	"sleep_subtitle" varchar DEFAULT 'Les siestes',
  	"sleep_content" jsonb,
  	"living_place_title" varchar DEFAULT 'Lieu de vie',
  	"living_place_description" varchar DEFAULT 'J''accueille vos enfants dans une maison clôturée avec jardin qui se situe au bord du Lac Léman.',
  	"living_place_content" jsonb,
  	"equipment_section_title" varchar DEFAULT 'Les équipements',
  	"equipment_section_subtitle" varchar DEFAULT 'Tout le matériel nécessaire pour accueillir vos enfants',
  	"objectives_section_title" varchar DEFAULT 'Mes objectifs',
  	"objectives_section_subtitle" varchar DEFAULT 'Ce qui est important pour moi dans l''accompagnement de vos enfants',
  	"adaptation_title" varchar DEFAULT 'Période d''adaptation',
  	"adaptation_subtitle" varchar DEFAULT 'Une période importante pour permettre à l''enfant, aux parents, et à nounou de faire connaissance en douceur.',
  	"adaptation_image_id" integer,
  	"adaptation_key_message" varchar DEFAULT 'La clé d''un accueil réussi : une confiance mutuelle et un dialogue permanent entre les parents et la nounou.',
  	"adaptation_content" jsonb,
  	"organization_title" varchar DEFAULT 'Organisation des affaires',
  	"organization_subtitle" varchar DEFAULT 'Glissez pour comparer ce qu''il faut apporter et ce qui est fourni',
  	"organization_bag_image_id" integer,
  	"organization_nounou_image_id" integer,
  	"daily_schedule_section_title" varchar DEFAULT 'Organisation d''une journée',
  	"daily_schedule_section_subtitle" varchar DEFAULT 'Comment se déroule une journée type chez nounou',
  	"charter_section_title" varchar DEFAULT 'Charte de vie',
  	"charter_section_subtitle" varchar DEFAULT 'Les règles de vie chez nounou, écrites du point de vue de votre enfant 💜',
  	"settings_is_available" boolean DEFAULT true,
  	"settings_unavailable_message" varchar DEFAULT 'Nounou actuellement indisponible, merci de votre compréhension.',
  	"settings_return_date" varchar,
  	"settings_email" varchar DEFAULT 'andorma@gmail.com',
  	"settings_phone" varchar DEFAULT '06 03 28 69 06',
  	"settings_landline" varchar DEFAULT '04 50 72 81 92',
  	"settings_address" varchar DEFAULT '1250 Chemin de la Renouillère, 74140 Sciez',
  	"settings_nounou_top_link" varchar DEFAULT 'https://aide-au-top.fr/assistante-maternelle-sciez-74140-19',
  	"settings_opening_hours" varchar DEFAULT '7h - 19h',
  	"settings_map_lat" numeric DEFAULT 46.349104,
  	"settings_map_lng" numeric DEFAULT 6.397748,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts" ADD CONSTRAINT "posts_featured_image_id_media_id_fk" FOREIGN KEY ("featured_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "posts_rels" ADD CONSTRAINT "posts_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_rels" ADD CONSTRAINT "posts_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_rels" ADD CONSTRAINT "posts_rels_tags_fk" FOREIGN KEY ("tags_id") REFERENCES "public"."tags"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_tags_fk" FOREIGN KEY ("tags_id") REFERENCES "public"."tags"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "landing_about_stats" ADD CONSTRAINT "landing_about_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."landing"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "landing_family_members" ADD CONSTRAINT "landing_family_members_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "landing_family_members" ADD CONSTRAINT "landing_family_members_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."landing"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "landing_trainings_section_items" ADD CONSTRAINT "landing_trainings_section_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."landing"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "landing_sleep_tags" ADD CONSTRAINT "landing_sleep_tags_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."landing"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "landing_living_place_images" ADD CONSTRAINT "landing_living_place_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "landing_living_place_images" ADD CONSTRAINT "landing_living_place_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."landing"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "landing_equipment_section_items" ADD CONSTRAINT "landing_equipment_section_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."landing"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "landing_objectives_section_items" ADD CONSTRAINT "landing_objectives_section_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."landing"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "landing_adaptation_badges" ADD CONSTRAINT "landing_adaptation_badges_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."landing"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "landing_organization_bag_items" ADD CONSTRAINT "landing_organization_bag_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."landing"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "landing_organization_nounou_items" ADD CONSTRAINT "landing_organization_nounou_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."landing"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "landing_daily_schedule_section_items" ADD CONSTRAINT "landing_daily_schedule_section_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."landing"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "landing_charter_section_items" ADD CONSTRAINT "landing_charter_section_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."landing"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "landing" ADD CONSTRAINT "landing_about_image_id_media_id_fk" FOREIGN KEY ("about_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "landing" ADD CONSTRAINT "landing_introduction_image_id_media_id_fk" FOREIGN KEY ("introduction_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "landing" ADD CONSTRAINT "landing_adaptation_image_id_media_id_fk" FOREIGN KEY ("adaptation_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "landing" ADD CONSTRAINT "landing_organization_bag_image_id_media_id_fk" FOREIGN KEY ("organization_bag_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "landing" ADD CONSTRAINT "landing_organization_nounou_image_id_media_id_fk" FOREIGN KEY ("organization_nounou_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "users_sessions_order_idx" ON "users_sessions" USING btree ("_order");
  CREATE INDEX "users_sessions_parent_id_idx" ON "users_sessions" USING btree ("_parent_id");
  CREATE INDEX "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE UNIQUE INDEX "users_email_idx" ON "users" USING btree ("email");
  CREATE INDEX "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX "media_filename_idx" ON "media" USING btree ("filename");
  CREATE UNIQUE INDEX "posts_slug_idx" ON "posts" USING btree ("slug");
  CREATE INDEX "posts_featured_image_idx" ON "posts" USING btree ("featured_image_id");
  CREATE INDEX "posts_updated_at_idx" ON "posts" USING btree ("updated_at");
  CREATE INDEX "posts_created_at_idx" ON "posts" USING btree ("created_at");
  CREATE INDEX "posts_rels_order_idx" ON "posts_rels" USING btree ("order");
  CREATE INDEX "posts_rels_parent_idx" ON "posts_rels" USING btree ("parent_id");
  CREATE INDEX "posts_rels_path_idx" ON "posts_rels" USING btree ("path");
  CREATE INDEX "posts_rels_categories_id_idx" ON "posts_rels" USING btree ("categories_id");
  CREATE INDEX "posts_rels_tags_id_idx" ON "posts_rels" USING btree ("tags_id");
  CREATE UNIQUE INDEX "categories_slug_idx" ON "categories" USING btree ("slug");
  CREATE INDEX "categories_updated_at_idx" ON "categories" USING btree ("updated_at");
  CREATE INDEX "categories_created_at_idx" ON "categories" USING btree ("created_at");
  CREATE UNIQUE INDEX "tags_slug_idx" ON "tags" USING btree ("slug");
  CREATE INDEX "tags_updated_at_idx" ON "tags" USING btree ("updated_at");
  CREATE INDEX "tags_created_at_idx" ON "tags" USING btree ("created_at");
  CREATE UNIQUE INDEX "payload_kv_key_idx" ON "payload_kv" USING btree ("key");
  CREATE INDEX "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX "payload_locked_documents_rels_posts_id_idx" ON "payload_locked_documents_rels" USING btree ("posts_id");
  CREATE INDEX "payload_locked_documents_rels_categories_id_idx" ON "payload_locked_documents_rels" USING btree ("categories_id");
  CREATE INDEX "payload_locked_documents_rels_tags_id_idx" ON "payload_locked_documents_rels" USING btree ("tags_id");
  CREATE INDEX "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");
  CREATE INDEX "landing_about_stats_order_idx" ON "landing_about_stats" USING btree ("_order");
  CREATE INDEX "landing_about_stats_parent_id_idx" ON "landing_about_stats" USING btree ("_parent_id");
  CREATE INDEX "landing_family_members_order_idx" ON "landing_family_members" USING btree ("_order");
  CREATE INDEX "landing_family_members_parent_id_idx" ON "landing_family_members" USING btree ("_parent_id");
  CREATE INDEX "landing_family_members_image_idx" ON "landing_family_members" USING btree ("image_id");
  CREATE INDEX "landing_trainings_section_items_order_idx" ON "landing_trainings_section_items" USING btree ("_order");
  CREATE INDEX "landing_trainings_section_items_parent_id_idx" ON "landing_trainings_section_items" USING btree ("_parent_id");
  CREATE INDEX "landing_sleep_tags_order_idx" ON "landing_sleep_tags" USING btree ("_order");
  CREATE INDEX "landing_sleep_tags_parent_id_idx" ON "landing_sleep_tags" USING btree ("_parent_id");
  CREATE INDEX "landing_living_place_images_order_idx" ON "landing_living_place_images" USING btree ("_order");
  CREATE INDEX "landing_living_place_images_parent_id_idx" ON "landing_living_place_images" USING btree ("_parent_id");
  CREATE INDEX "landing_living_place_images_image_idx" ON "landing_living_place_images" USING btree ("image_id");
  CREATE INDEX "landing_equipment_section_items_order_idx" ON "landing_equipment_section_items" USING btree ("_order");
  CREATE INDEX "landing_equipment_section_items_parent_id_idx" ON "landing_equipment_section_items" USING btree ("_parent_id");
  CREATE INDEX "landing_objectives_section_items_order_idx" ON "landing_objectives_section_items" USING btree ("_order");
  CREATE INDEX "landing_objectives_section_items_parent_id_idx" ON "landing_objectives_section_items" USING btree ("_parent_id");
  CREATE INDEX "landing_adaptation_badges_order_idx" ON "landing_adaptation_badges" USING btree ("_order");
  CREATE INDEX "landing_adaptation_badges_parent_id_idx" ON "landing_adaptation_badges" USING btree ("_parent_id");
  CREATE INDEX "landing_organization_bag_items_order_idx" ON "landing_organization_bag_items" USING btree ("_order");
  CREATE INDEX "landing_organization_bag_items_parent_id_idx" ON "landing_organization_bag_items" USING btree ("_parent_id");
  CREATE INDEX "landing_organization_nounou_items_order_idx" ON "landing_organization_nounou_items" USING btree ("_order");
  CREATE INDEX "landing_organization_nounou_items_parent_id_idx" ON "landing_organization_nounou_items" USING btree ("_parent_id");
  CREATE INDEX "landing_daily_schedule_section_items_order_idx" ON "landing_daily_schedule_section_items" USING btree ("_order");
  CREATE INDEX "landing_daily_schedule_section_items_parent_id_idx" ON "landing_daily_schedule_section_items" USING btree ("_parent_id");
  CREATE INDEX "landing_charter_section_items_order_idx" ON "landing_charter_section_items" USING btree ("_order");
  CREATE INDEX "landing_charter_section_items_parent_id_idx" ON "landing_charter_section_items" USING btree ("_parent_id");
  CREATE INDEX "landing_about_about_image_idx" ON "landing" USING btree ("about_image_id");
  CREATE INDEX "landing_introduction_introduction_image_idx" ON "landing" USING btree ("introduction_image_id");
  CREATE INDEX "landing_adaptation_adaptation_image_idx" ON "landing" USING btree ("adaptation_image_id");
  CREATE INDEX "landing_organization_organization_bag_image_idx" ON "landing" USING btree ("organization_bag_image_id");
  CREATE INDEX "landing_organization_organization_nounou_image_idx" ON "landing" USING btree ("organization_nounou_image_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "users_sessions" CASCADE;
  DROP TABLE "users" CASCADE;
  DROP TABLE "media" CASCADE;
  DROP TABLE "posts" CASCADE;
  DROP TABLE "posts_rels" CASCADE;
  DROP TABLE "categories" CASCADE;
  DROP TABLE "tags" CASCADE;
  DROP TABLE "payload_kv" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TABLE "landing_about_stats" CASCADE;
  DROP TABLE "landing_family_members" CASCADE;
  DROP TABLE "landing_trainings_section_items" CASCADE;
  DROP TABLE "landing_sleep_tags" CASCADE;
  DROP TABLE "landing_living_place_images" CASCADE;
  DROP TABLE "landing_equipment_section_items" CASCADE;
  DROP TABLE "landing_objectives_section_items" CASCADE;
  DROP TABLE "landing_adaptation_badges" CASCADE;
  DROP TABLE "landing_organization_bag_items" CASCADE;
  DROP TABLE "landing_organization_nounou_items" CASCADE;
  DROP TABLE "landing_daily_schedule_section_items" CASCADE;
  DROP TABLE "landing_charter_section_items" CASCADE;
  DROP TABLE "landing" CASCADE;
  DROP TYPE "public"."enum_posts_status";
  DROP TYPE "public"."enum_landing_objectives_section_items_icon";
  DROP TYPE "public"."enum_landing_adaptation_badges_color";`)
}
