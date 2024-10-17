import { knex } from '../knex';

export const BlocoDAO = {
	store: async (props: { id_repertorio: number; nome: string; ordem: number; }) => {
		return await knex.insert({
			id_repertorio: props.id_repertorio,
			nome: props.nome,
			ordem: props.ordem,
		});
	},
};