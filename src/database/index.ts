import * as SQLite from 'expo-sqlite';

export const Database = SQLite.openDatabaseSync('./mydb.db');