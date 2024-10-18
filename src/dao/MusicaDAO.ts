import { Database } from '../database';

export const MusicaDAO = {
	listar: async (props: { id_repertorio?: number; }) => {
		var where = '';
		if (!!props.id_repertorio) {
			where = ` where id_repertorio = ${props.id_repertorio}`;
		}
		return Database.getAllAsync(`select * from musica ${where}`);
	},
	visualizar: async (props: { id: number; }): Promise<any> => {
		return Database.getFirstAsync(`select * from musica where id = ?`, [props.id]);
	},
	cadastrar: async (props: { nome: string; cifra: string; }) => {
		return Database.runAsync(`insert into musica ( nome, cifra ) values (?,?)`, [props.nome, props.cifra]);
	},
	atualizar: async (props: { id: number; nome: string; cifra: string; }) => {
		return Database.runAsync(`update musica set nome = ?, cifra = ? where id = ?`, [props.nome, props.cifra, props.id]);
	},
};