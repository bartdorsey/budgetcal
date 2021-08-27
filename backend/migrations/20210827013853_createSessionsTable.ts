import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.raw(`
    CREATE TABLE "sessions" (
        "sid" varchar NOT NULL COLLATE "default",
	    "sess" json NOT NULL,
	    "expire" timestamp(6) NOT NULL
    )
    WITH (OIDS=FALSE);

    ALTER TABLE "sessions" ADD CONSTRAINT "sessions_pkey" PRIMARY KEY ("sid") NOT DEFERRABLE INITIALLY IMMEDIATE;

    CREATE INDEX "IDX_session_expire" ON "sessions" ("expire");
    `,
    );
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable('sessions');
}

