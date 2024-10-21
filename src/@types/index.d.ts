


interface Repertorio {
	id: number;
	nome: string;
	ordem: number;
	data_criacao: string;
}

interface Musica {
	id: number;
	nome: string;
	cifra: string;
	data_criacao: string;
}

interface Bloco {
	id: number;
	id_repertorio: number;
	nome: string;
	ordem: number;
	data_criacao: string;
}

interface MusicaRepertorio {
	id: number;
	id_musica: number;
	id_repertorio: number;
	id_bloco: number | null;
	ordem: number;
	data_criacao: string;
}

interface MusicaRepertorioLista extends MusicaRepertorio {
	id_musica: number;
	nome: string;
}
