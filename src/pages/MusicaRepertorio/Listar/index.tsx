import { useCallback, useEffect, useState } from 'react';
import DraggableFlatList, { RenderItemParams } from 'react-native-draggable-flatlist';
import { useNavigation, useRoute, useFocusEffect } from '@react-navigation/native';
import { NativeStackNavigationOptions } from '@react-navigation/native-stack';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Alert, Text, TouchableOpacity, View } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';

import { MusicaRepertorioDAO } from '../../../dao/MusicaRepertorioDAO';
import { ModalCadastrar } from './components/ModalCadastrar';

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

	useFocusEffect(
		useCallback(() => {
			initialLoading();
		}, [])
	);

	useEffect(() => {
		const options: NativeStackNavigationOptions = {
			headerRight: () => (
				<View className="flex-row">
					<TouchableOpacity
						className="px-2"
						onPress={() => setShowModalCadastrar(true)}
					>
						<MaterialCommunityIcons name="music-note-plus" size={24} color="#888" />
					</TouchableOpacity>
					<TouchableOpacity
						className="px-2"
						onPress={() => navigate('Reproduzir', { id })}
					>
						<Ionicons name="play-outline" size={24} color="#888" />
					</TouchableOpacity>
				</View>
			)
		};
		setOptions(options);
	}, []);

	const renderLeftActions = (id: number) => (
		<TouchableOpacity
			onPress={() => handlerDeleteMusicaRepertorio(id)}
			className="bg-red-500 items-center justify-center px-4"
		>
			<Ionicons name="trash-outline" size={22} color="#FFF" />
		</TouchableOpacity>
	);

	const renderItem = useCallback(
		({ item, drag, isActive }: RenderItemParams<MusicaRepertorioLista>) => {
			return (
				<Swipeable
					renderLeftActions={() => renderLeftActions(item.id)}
				>
					<View className={`flex-row ${isActive ? 'bg-blue-100' : ''}`}>
						<TouchableOpacity
							className="p-4 flex-row flex-1 gap-3 items-center"
							onPress={() => navigate('MusicaRepertorioVisualizar', { id: item.id_musica, origem: 'MusicaRepertorio' })}
						>
							<Ionicons name="musical-notes-outline" size={20} color="black" />
							<Text className="text-lg">{item.nome}</Text>
						</TouchableOpacity>
						<TouchableOpacity
							className="justify-center px-4"
							onLongPress={drag}
						>
							<Ionicons name="reorder-four-outline" size={20} color="#00000040" />
						</TouchableOpacity>
					</View>
				</Swipeable>
			);
		},
		[]
	);

	async function handlerDeleteMusicaRepertorio(id: number) {
		const { isConfirmed } = await new Promise<{ isConfirmed: boolean }>((resolve) => {
			Alert.alert(
				"Deletar música do repertório",
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
			await MusicaRepertorioDAO.deletar({ id });
			initialLoading();
		}
	}

	async function handleUpdateOrdem(musicasOrdenadas: MusicaRepertorioLista[]) {
		setMusicas(musicasOrdenadas);
		for (var num = 0; num < musicasOrdenadas.length; num++) {
			await MusicaRepertorioDAO.atualizarOrdem({
				id: musicasOrdenadas[num].id,
				ordem: num + 1
			});
		}
	}

	return (
		<View>
			<DraggableFlatList
				data={musicas}
				className="h-full"
				keyExtractor={item => item.id.toString()}
				ItemSeparatorComponent={() => (
					<View className='h-[1px] w-full bg-gray-300'></View>
				)}
				renderItem={renderItem}
				onDragEnd={({ data }) => handleUpdateOrdem(data)}
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