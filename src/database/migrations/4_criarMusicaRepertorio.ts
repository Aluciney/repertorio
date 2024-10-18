import { Database } from '../../database';

export async function up(): Promise<void> {
  return Database.execAsync(`
    create table if not exists musica_repertorio (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      id_musica INTEGER NOT NULL,
      id_repertorio INTEGER NOT NULL,
      id_bloco INTEGER,
      ordem INTEGER NOT NULL,
      data_criacao DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (id_musica) REFERENCES musica (id),
      FOREIGN KEY (id_repertorio) REFERENCES repertorio (id),
      FOREIGN KEY (id_bloco) REFERENCES bloco (id)
    )
  `);
}

export async function down(): Promise<void> {
  return Database.execAsync(`drop table musica_repertorio`);
}