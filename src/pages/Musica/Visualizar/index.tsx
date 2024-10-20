import { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import { MusicaDAO } from '../../../dao/MusicaDAO';

export const Visualizar: React.FC = () => {
	const { params } = useRoute();
	const { id } = params as { id: number; };
	const [loading, setLoading] = useState(true);
	const [musica, setMusica] = useState<Musica>();
	const { goBack } = useNavigation();
	const [cifra, setCifra] = useState('');

	const numberOfLines = Math.max(1, Math.floor(cifra.split('\n').length));

	async function initialLoading() {
		setLoading(true);
		const musica_ = await MusicaDAO.visualizar({ id });
		setCifra(musica_.cifra);
		setMusica(musica_);
		setLoading(false);
	}

	const createLines = (count: number) => {
		const lines = [];
		for (let i = 0; i <= count; i++) {
			lines.push(
				<View
					key={i}
					className="absolute h-[1px] right-0 left-0 bg-gray-200"
					style={{ top: (i + 1) * 14.7, opacity: i === 0 ? 0 : 100 }}
				/>
			);
		}
		return lines;
	};

	useEffect(() => {
		initialLoading();
	}, []);

	const handleSave = async () => {
		if (!!musica) {
			await MusicaDAO.atualizar({ id: musica.id, nome: musica.nome, cifra: cifra });
			goBack();
		}
	}

	return (
		<View className="flex-1">
			<View className="relative">
				{createLines(numberOfLines)}
					<TextInput
						className="w-full p-4 text-[16px] text-black font-semibold"
						multiline
						value={cifra}
						style={{ fontFamily: 'Courier New' }}
						autoComplete="off"
						autoCorrect={false}
						onChangeText={setCifra}
					/>
			</View>
			<TouchableOpacity
				onPress={handleSave}
				className="absolute top-3 right-3 bg-gray-400 px-6 py-3 rounded-md"
			>
				<Text className="text-white">Salvar</Text>
			</TouchableOpacity>
		</View>
	);
};