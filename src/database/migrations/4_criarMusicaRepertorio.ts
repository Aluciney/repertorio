import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('musica_repertorio', (table) => {
    table.increments('id').primary();
    table.integer('id_musica').notNullable().unsigned().references('id').inTable('musica').onDelete('CASCADE').onUpdate('CASCADE');
    table.integer('id_repertorio').notNullable().unsigned().references('id').inTable('repertorio').onDelete('CASCADE').onUpdate('CASCADE');
    table.integer('id_bloco').unsigned().references('id').inTable('bloco').onDelete('CASCADE').onUpdate('CASCADE');
    table.integer('ordem').notNullable();
    table.dateTime('data_criacao').notNullable().defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('musica_repertorio');
}