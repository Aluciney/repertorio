import { Database } from '../database';

export const MusicaRepertorioDAO = {
	listar: async (props: { id_repertorio: number; }) => {
		return Database.getAllAsync<any>(`
			select 
				mr.*,
				m.id as id_musica,
				m.nome
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
		`,[props.id_musica, props.id_repertorio, props?.id_bloco || null, props.ordem]);
	},
};