alter table "public"."posts" drop column "is_stared";

alter table "public"."posts" add column "is_starred" boolean not null default false;


