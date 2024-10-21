import { useEffect, useState } from 'react';
import { NativeStackNavigationOptions } from '@react-navigation/native-stack';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

import { MusicaRepertorioDAO } from '../../../dao/MusicaRepertorioDAO';
import { ModalCadastrar } from './components/ModalCadastrar';

interface MusicaRepertorioLista extends MusicaRepertorio {
	id_musica: number;
	nome: string;
}

export const Listar: React.FC = () => {
	const { params } = useRoute();
	const { id } = params as { id: number; };
	const [loading, setLoading] = useState(true);
	const [musicas, setMusicas] = useState<MusicaRepertorioLista[]>([]);
	const { navigate, setOptions } = useNavigation<any>();
	const [showModalCadastrar, setShowModalCadastrar] = useState(false);

	async function initialLoading() {
		setLoading(true);
		const musicas_ = await MusicaRepertorioDAO.listar({ id_repertorio: id });
		setMusicas(musicas_);
		setLoading(false);
	}

	useEffect(() => {
		initialLoading();
	}, []);

	useEffect(() => {
		const options: NativeStackNavigationOptions = {
			headerRight: () => (
				<TouchableOpacity
					style={{ paddingRight: 10 }}
					onPress={() => setShowModalCadastrar(true)}
				>
					<MaterialCommunityIcons name="music-note-plus" size={24} color="black" />
				</TouchableOpacity>
			)
		};
		setOptions(options);
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
						onPress={() => navigate('MusicaRepertorioVisualizar', { id: item.id_musica, origem: 'MusicaRepertorio' })}
					>
						<Ionicons name="musical-notes-outline" size={20} color="black" />
						<Text className="text-lg">{item.nome}</Text>
					</TouchableOpacity>
				)}
			/>
			<ModalCadastrar
				id_repertorio={id}
				show={showModalCadastrar}
				setShow={setShowModalCadastrar}
				callback={initialLoading}
			/>
		</View>
	);
};