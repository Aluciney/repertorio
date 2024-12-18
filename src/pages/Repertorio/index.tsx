import { useCallback, useEffect, useState } from 'react';
import DraggableFlatList, { RenderItemParams } from 'react-native-draggable-flatlist';
import { NativeStackNavigationOptions } from '@react-navigation/native-stack';
import Swipeable from 'react-native-gesture-handler/ReanimatedSwipeable';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { Alert, Text, TouchableOpacity, View } from 'react-native';
import { useActionSheet } from '@expo/react-native-action-sheet';
import { AntDesign, Ionicons } from '@expo/vector-icons';

import { MusicaRepertorioDAO } from '../../dao/MusicaRepertorioDAO';
import { ModalCadastrar } from './components/ModalCadastrar';
import { InputSearch } from '../../components/InputSearch';
import { RepertorioDAO } from '../../dao/RepertorioDAO';
import { ModalEditar } from './components/ModalEditar';
import { useTheme } from '../../contexts/theme';

export const Repertorio: React.FC = () => {
	const { theme, layout } = useTheme();
	const [loading, setLoading] = useState(true);
	const [repertorios, setRepertorios] = useState<Repertorio[]>([]);
	const { navigate, setOptions } = useNavigation<any>();
	const [showModalCadastrar, setShowModalCadastrar] = useState(false);
	const [showModalEditar, setShowModalEditar] = useState<Repertorio>();
	const { showActionSheetWithOptions } = useActionSheet();
	const [search, setSearch] = useState('');

	async function initialLoading() {
		setLoading(true);
		const repertorios_ = await RepertorioDAO.listar();
		setRepertorios(repertorios_);
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
					<AntDesign name="addfolder" size={22} color="#888" />
				</TouchableOpacity>
			)
		};
		setOptions(options);
	}, []);

	const renderLeftActions = (id: number) => (
		<TouchableOpacity
			onPress={() => handlerDeleteRepertorio(id)}
			className="bg-red-500 items-center justify-center px-4"
		>
			<Ionicons name="trash-outline" size={22} color="#FFF" />
		</TouchableOpacity>
	);

	async function handlerDeleteRepertorio(id: number) {
		const { isConfirmed } = await new Promise<{ isConfirmed: boolean }>((resolve) => {
			Alert.alert(
				"Deletar repertório",
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
			await MusicaRepertorioDAO.deletarPorRepertorio({ id_repertorio: id });
			await RepertorioDAO.deletar({ id });
			const repertorios_ = await RepertorioDAO.listar();
			setRepertorios(repertorios_);
		}
	}

	const renderItem = useCallback(
		({ item, drag, isActive }: RenderItemParams<Repertorio>) => {
			return (
				<Swipeable
					renderLeftActions={() => renderLeftActions(item.id)}
					childrenContainerStyle={{ backgroundColor: theme.background }}
					containerStyle={{ backgroundColor: '#ef4444' }}
				>
					<View className={`flex-row ${isActive ? 'bg-zinc-800' : ''}`}>
						<TouchableOpacity
							className="p-4 flex-row flex-1 gap-3 items-center"
							onPress={() => navigate('MusicaRepertorioListar', { id: item.id })}
							onLongPress={() => onPressRepertorio(item)}
						>
							<AntDesign name="folder1" size={20} color="white" />
							<Text className="text-lg text-white">{item.nome}</Text>
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

	async function handleUpdateOrdem(repertoriosOrdenados: Repertorio[]) {
		setRepertorios(repertoriosOrdenados);
		for (var num = 0; num < repertoriosOrdenados.length; num++) {
			await RepertorioDAO.atualizarOrdem({
				id: repertoriosOrdenados[num].id,
				ordem: num + 1
			});
		}
	}

	async function onPressRepertorio(repertorio_: Repertorio) {
		showActionSheetWithOptions({
			options: [
				'Renomear',
				'Excluir',
				'Cancelar',
			],
			destructiveButtonIndex: 1,
			cancelButtonIndex: 2,
			showSeparators: true,
			userInterfaceStyle: layout
		}, (index) => {
			switch (index) {
				case 0:
					setShowModalEditar(repertorio_);
					break;
				case 1:
					handlerDeleteRepertorio(repertorio_.id);
					break;
				default:
					break;
			}
		});
	}

	return (
		<View className="flex-1">
			<DraggableFlatList
				data={repertorios.filter(music => music.nome.toLowerCase().includes(search.toLowerCase()))}
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
				show={showModalCadastrar}
				setShow={setShowModalCadastrar}
				callback={initialLoading}
			/>
			<ModalEditar
				show={showModalEditar}
				setShow={setShowModalEditar}
				callback={initialLoading}
			/>
		</View>
	);
};