import { Database } from '../database';

export const RepertorioDAO = {
	listar: async () => {
		return Database.getAllAsync<Repertorio>('select * from repertorio order by ordem asc');
	},
	cadastrar: async (props: { nome: string; ordem: number; }) => {
		return Database.runAsync(`insert into repertorio ( nome, ordem ) values (?,?)`,[props.nome, props.ordem]);
	},
};