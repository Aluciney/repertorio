import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('bloco', (table) => {
    table.increments('id').primary();
    table.integer('id_repertorio').notNullable().unsigned().references('id').inTable('repertorio').onDelete('CASCADE').onUpdate('CASCADE');
    table.string('nome').notNullable();
    table.integer('ordem').notNullable();
    table.dateTime('data_criacao').notNullable().defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('bloco');
}