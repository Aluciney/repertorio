import { useEffect, useRef, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import { MusicaDAO } from '../../../dao/MusicaDAO';
import { RichEditor, RichToolbar } from 'react-native-pell-rich-editor';

export const Visualizar: React.FC = () => {
	const richText = useRef<RichEditor>(null);
	const { params } = useRoute();
	const { id } = params as { id: number; };
	const [loading, setLoading] = useState(true);
	const [musica, setMusica] = useState<Musica>();
	const { goBack } = useNavigation();

	async function initialLoading() {
		setLoading(true);
		const musica_ = await MusicaDAO.visualizar({ id });
		setMusica(musica_);
		setLoading(false);
	}

	useEffect(() => {
		initialLoading();
	}, []);

	const handleSave = () => {
		richText.current?.getContentHtml().then(async (html) => {
			if (!!musica) {
				await MusicaDAO.atualizar({ id: musica.id, nome: musica.nome, cifra: html });
				goBack();
			}
		});
	}

	return (
		<View>
			<RichEditor
				ref={richText}
				placeholder="..."
				className="min-h-full"
				initialContentHTML={musica?.cifra || ''}
				editorStyle={{ backgroundColor: '#EEE' }}
				scrollEnabled
			/>
			<RichToolbar
				editor={richText}
				actions={[]}
			/>
			<TouchableOpacity
				onPress={handleSave}
				className="absolute top-3 right-3 bg-gray-400 px-6 py-3 rounded-md"
			>
				<Text className="text-white">Salvar</Text>
			</TouchableOpacity>
		</View>
	);
};