import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('users_budgets', table => {
        table.increments();
        table.integer('user_id')
            .notNullable()
            .references('id')
            .inTable('users')
        table.integer('budget_id')
            .notNullable()
            .references('id')
            .inTable('budgets');
        table.timestamps(true, true);
    })
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable('users_budgets');
}

