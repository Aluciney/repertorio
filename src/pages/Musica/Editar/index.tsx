import { useEffect, useState } from 'react';
import { NativeStackNavigationOptions } from '@react-navigation/native-stack';
import { useRoute, useNavigation } from '@react-navigation/native';
import { View, TouchableOpacity, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { MusicaDAO } from '../../../dao/MusicaDAO';

export const Editar: React.FC = () => {
	const { params } = useRoute();
	const { id } = params as { id: number; };
	const [loading, setLoading] = useState(true);
	const [musica, setMusica] = useState<Musica>();
	const { goBack, setOptions } = useNavigation<any>();
	const [cifra, setCifra] = useState('');

	useEffect(() => {
		const options: NativeStackNavigationOptions = {
			headerRight: () => (
				<TouchableOpacity
					style={{ paddingRight: 10 }}
					onPress={handleSave}
				>
					<Ionicons name="save-outline" size={24} color="black" />
				</TouchableOpacity>
			)
		};
		setOptions(options);
	}, [musica, cifra]);

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
					style={{ fontFamily: 'Courier New' }}
					autoComplete="off"
					autoCorrect={false}
					value={cifra}
					onChangeText={setCifra}
				/>
			</View>
		</View>
	);
};