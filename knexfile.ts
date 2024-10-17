import { Knex } from 'knex';

const config: Knex.Config = {
	client: 'sqlite3',
	useNullAsDefault: true,
	connection: {
		filename: 'src/database/mydb.sqlite',
	},
	migrations: {
		tableName: 'knex_migrations',
		directory: 'src/database/migrations',
	},
	seeds: {
		directory: 'src/database/seeds'
	}
};

export default config;