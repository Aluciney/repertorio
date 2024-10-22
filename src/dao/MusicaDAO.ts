import { Database } from '../database';

export const MusicaDAO = {
	listar: async () => {
		return Database.getAllAsync(`select * from musica order by nome`);
	},
	listarSemVinculo: async (props: { id_repertorio: number; }) => {
		return Database.getAllAsync(`
			select * from musica 
			where id not in (select id_musica from musica_repertorio where id_repertorio = ?) 
			order by nome
		`,[props.id_repertorio]);
	},
	porNome: async (props: { nome: string; }): Promise<any> => {
		return Database.getFirstAsync(`select * from musica where nome = ?`, [props.nome]);
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
	deletar: async (props: { id: number; }) => {
		return Database.runAsync(`delete from musica where id = ?`, [props.id]);
	}
};