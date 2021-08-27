import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('budgets', table => {
        table.increments();
        table.string('name').notNullable();
        table.decimal('amount').notNullable();
        table.string('icon').notNullable().defaultTo('AttachMoney');
        table.string('color').notNullable().defaultTo('none');
        table.timestamps(true, true);
    });
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable('budgets');
}

