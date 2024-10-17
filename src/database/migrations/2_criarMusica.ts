import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('musica', (table) => {
    table.increments('id').primary();
    table.string('nome').notNullable();
    table.string('cifra').notNullable();
    table.dateTime('data_criacao').notNullable().defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('bloco');
}

