import { MusicaDAO } from '../dao/MusicaDAO';
import { up as criarRepertorio } from './migrations/1_criarRepertorio';
import { up as criarMusica } from './migrations/2_criarMusica';
import { up as criarBloco } from './migrations/3_criarBloco';
import { up as criarMusicaRepertorio } from './migrations/4_criarMusicaRepertorio';

import { up as inserirMusicas } from './seeders/inserirMusicas';

export async function ConfigurarBanco() {
	try {
		await criarRepertorio();
		console.log('---- TABLE: repositorio          ✔️');
	} catch (error) {
		console.log('---- TABLE: repositorio          ❌');
		console.log(error);
	}
	try {
		await criarMusica();
		console.log('---- TABLE: musica               ✔️');
	} catch (error) {
		console.log('---- TABLE: musica               ❌');
		console.log(error);
	}
	try {
		await criarBloco();
		console.log('---- TABLE: bloco                ✔️');
	} catch (error) {
		console.log('---- TABLE: bloco                ❌');
		console.log(error);
	}
	try {
		await criarMusicaRepertorio();
		console.log('---- TABLE: musica_repositorio   ✔️');
	} catch (error) {
		console.log('---- TABLE: musica_repositorio   ❌');
		console.log(error);
	}
	try {
		const musicas = await MusicaDAO.listar();
		if(musicas.length === 0){
			await inserirMusicas();
			console.log('---- DATA: musica                ✔️');
		}
	} catch (error) {
		console.log('---- TABLE: musica_repositorio   ❌');
		console.log(error);
	}
}