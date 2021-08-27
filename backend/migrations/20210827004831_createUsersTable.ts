import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('users', table => {
        table.increments();
        table.string('username').unique().notNullable();
        table.string('email').unique().notNullable();
        table.string('hashedPassword').notNullable();
        table.timestamps(true, true);
    })
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable('users');
}

