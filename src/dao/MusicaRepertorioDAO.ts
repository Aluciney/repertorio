import { Database } from '../database';

export const MusicaRepertorioDAO = {
	listar: async (props: { id_repertorio: number; }) => {
		return Database.getAllAsync<any>(`
			select 
				mr.*,
				m.id as id_musica,
				m.nome,
				m.cifra
			from musica_repertorio mr 
			inner join musica m on mr.id_musica = m.id
			where mr.id_repertorio = ?
			order by mr.ordem
		`, [props.id_repertorio]);
	},
	cadastrar: async (props: { id_musica: number; id_repertorio: number; id_bloco?: number; ordem: number; }) => {
		return Database.runAsync(`
				insert into musica_repertorio 
					( id_musica, id_repertorio, id_bloco, ordem ) 
				values (?,?,?,?)
		`, [props.id_musica, props.id_repertorio, props?.id_bloco || null, props.ordem]);
	},
	atualizarOrdem: async (props: { id: number; ordem: number; }) => {
		return Database.runAsync(`update musica_repertorio set ordem = ? where id = ?`, [props.ordem, props.id]);
	},
	deletarPorRepertorio: async (props: { id_repertorio: number; }) => {
		return Database.runAsync(`delete from musica_repertorio where id_repertorio = ?`, [props.id_repertorio]);
	},
	deletarPorMusica: async (props: { id_musica: number; }) => {
		return Database.runAsync(`delete from musica_repertorio where id_musica = ?`, [props.id_musica]);
	},
	deletar: async (props: { id: number; }) => {
		return Database.runAsync(`delete from musica_repertorio where id = ?`, [props.id]);
	}
};