import { Database } from '../database';

export const BlocoDAO = {
	cadastrar: async (props: { id_repertorio: number; nome: string; ordem: number; }) => {
		return Database.runAsync(`insert into bloco ( id_repertorio, nome, ordem ) values (?,?,?)`, [props.id_repertorio, props.nome, props.ordem]);
	},
};