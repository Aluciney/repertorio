import { Database } from '../../database';

export async function up(): Promise<void> {
  return Database.execAsync(`
    create table if not exists repertorio ( 
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      ordem INTEGER NOT NULL,
      data_criacao DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);
}

export async function down(): Promise<void> {
  return Database.execAsync(`drop table repertorio`);
}