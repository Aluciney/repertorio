import { Database } from '../../database';

export async function up(): Promise<void> {
  return Database.execAsync(`
    create table if not exists bloco (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      id_repertorio INTEGER NOT NULL,
      nome TEXT NOT NULL,
      ordem INTEGER NOT NULL,
      data_criacao DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (id_repertorio) REFERENCES repertorio (id)
    )
  `);
}

export async function down(): Promise<void> {
  return Database.execAsync(`drop table bloco`);
}