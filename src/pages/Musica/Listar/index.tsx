import { useEffect, useState } from 'react';
import { NativeStackNavigationOptions } from '@react-navigation/native-stack';
import { Alert, FlatList, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Swipeable } from 'react-native-gesture-handler';

import { ModalCadastrar } from './components/ModalCadastrar';
import { MusicaDAO } from '../../../dao/MusicaDAO';
import { MusicaRepertorioDAO } from '../../../dao/MusicaRepertorioDAO';

export const Listar: React.FC = () => {
	const [loading, setLoading] = useState(true);
	const [showModalCadastrar, setShowModalCadastrar] = useState(false);
	const [musicas, setMusicas] = useState<Musica[]>([]);
	const { navigate, setOptions } = useNavigation<any>();

	async function initialLoading() {
		setLoading(true);
		const musicas_ = await MusicaDAO.listar() as any;
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

	async function handlerDeleteMusica(id: number) {
		const { isConfirmed } = await new Promise<{ isConfirmed: boolean }>((resolve) => {
			Alert.alert(
				"Deletar música",
				"Tem certeza que deseja deletar?",
				[
					{
						text: "Não", onPress: () => {
							resolve({ isConfirmed: false })
						}
					},
					{
						text: "Sim",
						onPress: () => {
							resolve({ isConfirmed: true })
						},
					},
				],
				{ cancelable: false }
			);
		});
		if (isConfirmed) {
			await MusicaRepertorioDAO.deletarPorMusica({ id_musica: id });
			await MusicaDAO.deletar({ id });
			initialLoading();
		}
	}

	const renderLeftActions = (id: number) => (
		<TouchableOpacity
			onPress={() => handlerDeleteMusica(id)}
			className="bg-red-500 items-center justify-center px-4"
		>
			<Ionicons name="trash-outline" size={22} color="#FFF" />
		</TouchableOpacity>
	);

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
					<Swipeable
						renderLeftActions={() => renderLeftActions(item.id)}
					>
						<TouchableOpacity
							className="p-4 flex-row gap-3 items-center"
							onPress={() => navigate('MusicaVisualizar', { id: item.id, origem: 'Musica' })}
						>
							<Ionicons name="musical-notes-outline" size={20} color="black" />
							<Text className="text-lg">{item.nome}</Text>
						</TouchableOpacity>
					</Swipeable>
				)}
			/>
			<ModalCadastrar
				show={showModalCadastrar}
				setShow={setShowModalCadastrar}
				callback={initialLoading}
			/>
		</View>
	);
};