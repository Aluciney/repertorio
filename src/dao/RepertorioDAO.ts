import { Database } from '../database';

export const RepertorioDAO = {
	listar: async () => {
		return await Database.getAllAsync<Repertorio>('select * from repertorio order by ordem asc')
	}
};