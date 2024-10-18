import { useEffect, useState } from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRoute } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import { MusicaRepertorioDAO } from '../../../dao/MusicaRepertorioDAO';

interface MusicaRepertorioLista extends MusicaRepertorio {
	id_musica: number;
	nome: string;
}

export const Listar: React.FC = () => {
	const { params } = useRoute();
	const { id } = params as { id: number; };
	const [loading, setLoading] = useState(true);
	const [musicas, setMusicas] = useState<MusicaRepertorioLista[]>([]);
	const { navigate } = useNavigation<any>();

	async function initialLoading() {
		setLoading(true);
		const musicas_ = await MusicaRepertorioDAO.listar({ id_repertorio: id });
		setMusicas(musicas_);
		setLoading(false);
	}

	useEffect(() => {
		initialLoading();
	}, []);

	return (
		<View>
			<FlatList
				data={musicas}
				className="h-full"
				keyExtractor={item => item.id.toString()}
				ItemSeparatorComponent={() => (
					<View className='h-[1px] w-full bg-gray-300'></View>
				)}
				renderItem={({ item }) => (
					<TouchableOpacity
						className="p-4 flex-row gap-3 items-center"
						onPress={() => navigate('MusicaVisualizar', { id: item.id_musica })}
					>
						<Ionicons name="musical-notes-outline" size={20} color="black" />
						<Text className="text-lg">{item.nome}</Text>
					</TouchableOpacity>
				)}
			/>
		</View>
	);
};