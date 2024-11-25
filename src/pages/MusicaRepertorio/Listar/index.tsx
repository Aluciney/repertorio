import { useCallback, useEffect, useState } from 'react';
import DraggableFlatList, { RenderItemParams } from 'react-native-draggable-flatlist';
import { useNavigation, useRoute, useFocusEffect } from '@react-navigation/native';
import { NativeStackNavigationOptions } from '@react-navigation/native-stack';
import { Alert, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import Swipeable from 'react-native-gesture-handler/ReanimatedSwipeable';

import { MusicaRepertorioDAO } from '../../../dao/MusicaRepertorioDAO';
import { ModalCadastrar } from './components/ModalCadastrar';
import { InputSearch } from '../../../components/InputSearch';
import { useTheme } from '../../../contexts/theme';

export const Listar: React.FC = () => {
	const { theme } = useTheme();
	const { params } = useRoute();
	const { id } = params as { id: number; };
	const tabBarHeight = useBottomTabBarHeight();
	const [loading, setLoading] = useState(true);
	const [musicas, setMusicas] = useState<MusicaRepertorioLista[]>([]);
	const { navigate, setOptions } = useNavigation<any>();
	const [showModalCadastrar, setShowModalCadastrar] = useState(false);
	const [search, setSearch] = useState('');

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
					childrenContainerStyle={{ backgroundColor: theme.background }}
					containerStyle={{ backgroundColor: '#ef4444' }}
				>
					<View className={`flex-row ${isActive ? 'bg-zinc-800' : ''}`}>
						<TouchableOpacity
							className="p-4 flex-row flex-1 gap-3 items-center max-w-full"
							onPress={() => navigate('MusicaRepertorioVisualizar', { id: item.id_musica, origem: 'MusicaRepertorio' })}
						>
							<Ionicons name="musical-notes-outline" size={20} color="white" />
							<Text className="text-lg text-white truncate pr-4" numberOfLines={1}>{item.nome}</Text>
						</TouchableOpacity>
						<TouchableOpacity
							className="justify-center px-4"
							onLongPress={drag}
						>
							<Ionicons name="reorder-four-outline" size={20} color="#505050" />
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
		<View className="flex-1">
			<DraggableFlatList
				data={musicas.filter(music => music.nome.toLowerCase().includes(search.toLowerCase()))}
				className="h-full"
				keyExtractor={item => item.id.toString()}
				ItemSeparatorComponent={() => (
					<View className="h-[1px] w-full bg-zinc-800"></View>
				)}
				stickyHeaderIndices={[0]}
				ListHeaderComponent={(
					<InputSearch
						value={search}
						onChangeText={setSearch}
					/>
				)}
				renderItem={renderItem}
				onDragEnd={({ data }) => handleUpdateOrdem(data)}
				contentContainerStyle={{ paddingBottom: 10 }}
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