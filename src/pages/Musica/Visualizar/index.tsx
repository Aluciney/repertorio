import { useCallback, useEffect, useState } from 'react';
import { useNavigation, useRoute, useFocusEffect } from '@react-navigation/native';
import { NativeStackNavigationOptions } from '@react-navigation/native-stack';
import { Text, TouchableOpacity, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { MusicaDAO } from '../../../dao/MusicaDAO';

type Parte = string | JSX.Element;

export const Visualizar: React.FC = () => {
	const { params } = useRoute();
	const { id, origem } = params as { id: number; origem: string; };
	const [loading, setLoading] = useState(true);
	const [musica, setMusica] = useState<Musica>();
	const { navigate, setOptions } = useNavigation<any>();

	useEffect(() => {
		const options: NativeStackNavigationOptions = {
			headerRight: () => (
				<TouchableOpacity
					className="px-2"
					onPress={() => {
						if (origem === 'MusicaRepertorio') {
							navigate('MusicaRepertorioEditar', { id });
						} else {
							navigate('MusicaEditar', { id });
						}
					}}
				>
					<MaterialCommunityIcons name="file-document-edit-outline" size={24} color="#888" />
				</TouchableOpacity>
			)
		};
		setOptions(options);
	}, []);

	async function initialLoading() {
		setLoading(true);
		const musica_ = await MusicaDAO.visualizar({ id });
		setMusica(musica_);
		setLoading(false);
	}

	useFocusEffect(
		useCallback(() => {
			initialLoading();
		}, [])
	);

	const formatarLinhaComNotas = (linha: string): Parte[] => {
		const partes = linha.split(/(\s+)/);
		return partes.map((parte, index) => {
			const isNota = /^[A-G](#|m|7|b)?$/.test(parte);
			return (
				<Text
					key={index}
					className={isNota ? 'font-bold' : ''}
				>
					{parte}
				</Text>
			);
		});
	};

	const linhas: string[] = musica?.cifra.split('\n') || [];

	return (
		<ScrollView className="flex-1 pt-4">
			{linhas.map((linha, index) => (
				<Text key={index} className="px-4 text-[16px] text-black" style={{ fontFamily: 'Courier New' }}>
					{formatarLinhaComNotas(linha)}
				</Text>
			))}
		</ScrollView>
	);
};