
const notas = [
	"C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B",
	"Db", "Eb", "Gb", "Ab", "Bb"
];

const obterIndiceNota = (nota: string) => {
	return notas.findIndex(n => n === nota);
};

const transporNota = (nota: string, semitons: number): string => {
	const indexOriginal = obterIndiceNota(nota);
	if (indexOriginal === -1) return nota; // Caso não seja uma nota válida

	// Cálculo do novo índice (circular na lista de 12 notas)
	const novoIndex = (indexOriginal + semitons + 12) % 12;
	return notas[novoIndex];
};

export const Transpor = {
	nota: (linha: string, semitons: number) => {
		const regexNota = /^[A-G](b|#)?(m|maj|min|dim|aug|sus|add|º)?\d*(M|b|#)?(\/[A-G](b|#)?)?$/;
		let novaParte = linha;
		if (semitons > 0) {
			const transporParte = (parte: string): string => {
				if (regexNota.test(parte)) {
					//@ts-ignore
					const notaBase = parte.match(/[A-G](b|#)?/)[0];
					const novaNota = transporNota(notaBase, semitons);
					return parte.replace(notaBase, novaNota);
				}
				return parte;
			};
			novaParte = linha.split(/[\s/]+/).map(transporParte).join(' ');
		}
		return novaParte;
	}
};