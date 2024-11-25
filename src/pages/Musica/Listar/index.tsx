import { useCallback, useEffect, useState } from 'react';
import { Alert, FlatList, ListRenderItem, Text, TouchableOpacity, View } from 'react-native';
import { NativeStackNavigationOptions } from '@react-navigation/native-stack';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import Swipeable from 'react-native-gesture-handler/ReanimatedSwipeable';

import { MusicaRepertorioDAO } from '../../../dao/MusicaRepertorioDAO';
import { InputSearch } from '../../../components/InputSearch';
import { ModalCadastrar } from './components/ModalCadastrar';
import { MusicaDAO } from '../../../dao/MusicaDAO';
import { useTheme } from '../../../contexts/theme';

export const Listar: React.FC = () => {
	const { theme } = useTheme();
	const [loading, setLoading] = useState(true);
	const [showModalCadastrar, setShowModalCadastrar] = useState(false);
	const [musicas, setMusicas] = useState<Musica[]>([]);
	const { navigate, setOptions } = useNavigation<any>();
	const [search, setSearch] = useState('');

	async function initialLoading() {
		setLoading(true);
		const musicas_ = await MusicaDAO.listar() as any;
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
				<TouchableOpacity
					className="px-2"
					onPress={() => setShowModalCadastrar(true)}
				>
					<MaterialCommunityIcons name="music-note-plus" size={24} color="#888" />
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
			className="items-center justify-center px-4"
		>
			<Ionicons name="trash-outline" size={22} color="#FFF" />
		</TouchableOpacity>
	);

	const renderItem: ListRenderItem<Musica> = ({ item }) => (
		<Swipeable
			renderLeftActions={() => renderLeftActions(item.id)}
			childrenContainerStyle={{ backgroundColor: theme.background }}
			containerStyle={{ backgroundColor: '#ef4444' }}
		>
			<TouchableOpacity
				className="p-4 flex-row gap-3 items-center max-w-full"
				onPress={() => navigate('MusicaVisualizar', { id: item.id, origem: 'Musica' })}
			>
				<Ionicons name="musical-notes-outline" size={20} color="white" />
				<Text className="text-lg text-white truncate pr-4" numberOfLines={1}>{item.nome}</Text>
			</TouchableOpacity>
		</Swipeable>
	);

	return (
		<View className="flex-1">
			<FlatList<Musica>
				data={musicas.filter(music => music.nome.toLowerCase().includes(search.toLowerCase()))}
				className="h-full"
				stickyHeaderIndices={[0]}
				ListHeaderComponent={(
					<InputSearch
						value={search}
						onChangeText={setSearch}
					/>
				)}
				keyExtractor={(item) => item.id.toString()}
				ItemSeparatorComponent={() => <View className="h-[1px] w-full bg-zinc-800"></View>}
				renderItem={renderItem}
				contentContainerStyle={{ paddingBottom: 10 }}
			/>
			<ModalCadastrar
				show={showModalCadastrar}
				setShow={setShowModalCadastrar}
				callback={initialLoading}
			/>
		</View>
	);
};