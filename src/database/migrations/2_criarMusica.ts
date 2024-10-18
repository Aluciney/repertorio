import { Database } from '../../database';

export async function up(): Promise<void> {
  return Database.execAsync(`
    create table if not exists musica (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      cifra TEXT NOT NULL,
      data_criacao DATETIME DEFAULT CURRENT_TIMESTAMP
    )  
  `);
}

export async function down(): Promise<void> {
  return Database.execAsync(`drop table musica`);
}