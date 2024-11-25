import { Database } from '../../database';

export async function up(): Promise<void> {
	await Database.runAsync(`insert into musica (nome, cifra) values (?,?)`,
		[
			'Guia - A cruz sagrada',
			`Tom: Em

Solo - Em
Canta toda
Fica só em Em
Canta toda
Oração - Em
Solo - Em/Am`
		]
	);

	await Database.runAsync(`insert into musica (nome, cifra) values (?,?)`,
		[
			'Guia - Agachadinho católico',
			`Tom: Em

Solo - Em / B
Canta toda
Solo - Em / B
Canta toda
Solo - Em / B`
		]
	);

	await Database.runAsync(`insert into musica (nome, cifra) values (?,?)`,
		[
			'Guia - Alê alê',
			`Tom: Gm

Intro - guitarra
Solo - teclado Gm / Dm / Cm / Dm
Conta toda
Corre meu povo - RIFF
Solo - guitarra depois teclado
Sobe ladeira…
AlêAlê - 8x
RIFF - geral`
		]
	);

	await Database.runAsync(`insert into musica (nome, cifra) values (?,?)`,
		[
			'Guia - Anjos de Deus',
			`Tom: F

Marchinha`
		]
	);

	await Database.runAsync(`insert into musica (nome, cifra) values (?,?)`,
		[
			'Guia - Com Jesus é festa',
			`Tom: Cm

Solo - Cm/G
Canta toda
Lêlêlê
RIFF: guitarra e baixo
Solo - Cm/G
Canta toda
Lêlêlê
Com Jesus é festa - LENTO
Jesus é festa - ANIMADO
Solo - Cm/G`
		]
	);

	await Database.runAsync(`insert into musica (nome, cifra) values (?,?)`,
		[
			'Guia - Conto contigo',
			`Tom: F

Solo - Dm / Bb
Canta toda
Solo - Dm / Bb
Canta toda
Segundo solo - F / C / Dm / Bb 2x Gm / Am / C
RIFF: A / B / C / D / E / F / G / F
Refrão 2x
Segundo solo - F / C / Dm / Bb / F / C / Dm
RIFF FINAL: A / B / C / D / E / F / G / F / E / F`
		]
	);

	await Database.runAsync(`insert into musica (nome, cifra) values (?,?)`,
		[
			'Guia - Dança da amizade',
			`Tom: F`
		]
	);

	await Database.runAsync(`insert into musica (nome, cifra) values (?,?)`,
		[
			'Guia - Dança do avivamento',
			`Tom: D

Solo baixo - D
Canta toda
RIFF: baixo e guitarra
Canta toda
Canta “Eu vou parar de cantar” Em / G / D
Refrão 2x
RIFF: baixo e guitarra`
		]
	);

	await Database.runAsync(`insert into musica (nome, cifra) values (?,?)`,
		[
			'Guia - Deus é dez',
			`Tom: E

Solo - só guitarra - E / A 2x
Banda entra - C#m / A / B
Canta toda 2x
Preparação C / D / E / D 2x
Preparação F#m / G#m / E
Refrão 2x`
		]
	);

	await Database.runAsync(`insert into musica (nome, cifra) values (?,?)`,
		[
			'Guia - Erguei as mãos',
			`Tom: F`
		]
	);

	await Database.runAsync(`insert into musica (nome, cifra) values (?,?)`,
		[
			'Guia - Farinhada',
			`Tom: Em

Canta toda 2x - Em/D
Solo agachadinho - Em/B`
		]
	);

	await Database.runAsync(`insert into musica (nome, cifra) values (?,?)`,
		[
			'Guia - Grãozinho de mostarda',
			`Tom: Em

Canta toda - Em / B
Pré refrão - Am / D / G / C / B7 / Em 2x
“Essa montanha se moverá…”
Canta toda - Em / B
Pré refrão - Am / D / G / C / B7 / Em 2x
“Essa montanha se moverá…”
RIFF: E / G / E / G / D# / F# / D# / F# / D# / F# / E / G 2x
Pré refrão - Am / D / G / C / B7 / Em 2x
“Essa montanha se moverá…”
Solo agachadinho - Em / B`
		]
	);

	await Database.runAsync(`insert into musica (nome, cifra) values (?,?)`,
		[
			'Guia - Livre no espírito',
			`Tom: D#

Solo guitarra - D# / A# / F / Gm 2x
Solo geral - D# / A# / F / Gm 2x
Conta estrofe
Tu és bem vindo… - D# / Gm / D# / F 2x
Solo geral - D# / A# / F / Gm
Refrão
Solo guitarra - D# / A# / F / Gm
Tu és bem vindo… - D# / Gm / D# / F 2x`
		]
	);

	await Database.runAsync(`insert into musica (nome, cifra) values (?,?)`,
		[
			'Guia - Louvar Jesus é bom demais',
			`Tom: Em

Apresentação dos músicos - Em/D
Solo - Em/D
Canta toda
“Braço em baixo…”
“Louvar Jesus é bom…”
Canta toda
Solo - Em/D`
		]
	);

	await Database.runAsync(`insert into musica (nome, cifra) values (?,?)`,
		[
			'Guia - Me entregar a Jesus',
			`Tom: E

Solo baixo e guitarra - C#m
Solo guitarra
Canta toda
RIFF: parada baixo e guitarra
Canta toda
RIF parada baixo e guitarra`
		]
	);

	await Database.runAsync(`insert into musica (nome, cifra) values (?,?)`,
		[
			'Guia - O Céu inteiro está rezando',
			`Tom: G

Intro - G
Solo
Canta toda
Intro
Canta toda
Solo guitarra - Em / Am / Bm
…No extremo da dor
Refrão - pausa no final
Sobe o TOM - Bb
Solo guitarra`
		]
	);

	await Database.runAsync(`insert into musica (nome, cifra) values (?,?)`,
		[
			'Guia - O meu lugar é o céu',
			`Tom: G

Solo - Em / D / C`
		]
	);

	await Database.runAsync(`insert into musica (nome, cifra) values (?,?)`,
		[
			'Guia - O senhor é rei',
			`Tom: G

Solo - Em
Canta toda 2x
Solo - Em
Refrão só as vozes 2x
Termina - Em`
		]
	);

	await Database.runAsync(`insert into musica (nome, cifra) values (?,?)`,
		[
			'Guia - O vira',
			`Tom: E`
		]
	);

	await Database.runAsync(`insert into musica (nome, cifra) values (?,?)`,
		[
			'Guia - Obra nova, Deus quero louvar-te e celebramos',
			`Tom: D

Só bateria
Obra nova - Solo - D
Obra nova - Canta toda 2x
Preparação “Aleluia” - D
Deus quero louvar-te - Refrão - G
Deus quero louvar-te - Canta toda
Preparação “Aleluia” - D
Solo - G / Em / G / Em / C / D / B
Celebramos - Solo - C#m
Celebramos - Canta toda
Final lento - “Contigo Senhor”`
		]
	);

	await Database.runAsync(`insert into musica (nome, cifra) values (?,?)`,
		[
			'Guia - Passeio do caranguejo',
			`Tom: Dm

Solo - Am/Dm
RIFF: A/D/E/A8/E8/C#/D
Canta toda
Solo - Am/Dm
RIFF: A/D/E/A8/E8/C#/D
Canta toda
Solo - Am/Dm
RIFF: A/D/E/A8/E8/C#/D`
		]
	);

	await Database.runAsync(`insert into musica (nome, cifra) values (?,?)`,
		[
			'Guia - Pipoca',
			`Tom: F`
		]
	);

	await Database.runAsync(`insert into musica (nome, cifra) values (?,?)`,
		[
			'Guia - Porque Deus me ama',
			`Tom: A

Solo - A
Canta toda 2x
“Amar, porque Deus ama…”
“Nanananananaaaa”
Solo - A`
		]
	);

	await Database.runAsync(`insert into musica (nome, cifra) values (?,?)`,
		[
			'Guia - Profetiza filho de Maria',
			`Tom: G

G / Em / Bm / D
Solo C / Em / D7`
		]
	);

	await Database.runAsync(`insert into musica (nome, cifra) values (?,?)`,
		[
			'Guia - Quem é essa que avança',
			`Tom: G

Solo guitarra - branda entra - Em`
		]
	);

	await Database.runAsync(`insert into musica (nome, cifra) values (?,?)`,
		[
			'Guia - Sou estrangeiro aqui',
			`Tom: G`
		]
	);

	await Database.runAsync(`insert into musica (nome, cifra) values (?,?)`,
		[
			'Guia - Templo vivo',
			`Tom: D

Solo teclado
Canta 1 parte
RIFF: F# / G / A / B / A
Refrão 2x`
		]
	);

	await Database.runAsync(`insert into musica (nome, cifra) values (?,?)`,
		[
			'Guia - Uma entre todas',
			`Tom: G`
		]
	);

	await Database.runAsync(`insert into musica (nome, cifra) values (?,?)`,
		[
			'Guia - Uma revolução',
			`Tom: C#m

Intro - guitarra
Canta toda
Intro - guitarra
Canta toda
Parte lenta teclado
C#m / D#m / E / F#m / A / F#m / G#
Refrão 2x
Deixa Deus te surpreender…`
		]
	);
}