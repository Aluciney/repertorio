import { Database } from '../database';

export const RepertorioDAO = {
	listar: async () => {
		return Database.getAllAsync<Repertorio>('select * from repertorio order by ordem asc');
	},
	cadastrar: async (props: { nome: string; ordem: number; }) => {
		return Database.runAsync(`insert into repertorio ( nome, ordem ) values (?,?)`, [props.nome, props.ordem]);
	},
	atualizarOrdem: async (props: { id: number; ordem: number; }) => {
		return Database.runAsync(`update repertorio set ordem = ? where id = ?`, [props.ordem, props.id]);
	},
	deletar: async (props: { id: number; }) => {
		return Database.runAsync(`delete from repertorio where id = ?`, [props.id]);
	}
};