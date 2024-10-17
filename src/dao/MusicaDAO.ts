import { knex } from "../knex";

export const MusicaDAO = {
	index: async (props: { id_repertorio?: number; }) => {
		return await knex('repertorio')
			.where({ ...props }).orderBy('');
	}
};