import { useCallback, useEffect, useState } from 'react';
import DraggableFlatList, { RenderItemParams } from 'react-native-draggable-flatlist';
import { NativeStackNavigationOptions } from '@react-navigation/native-stack';
import { Alert, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Swipeable } from 'react-native-gesture-handler';
import { AntDesign, Ionicons } from '@expo/vector-icons';

import { MusicaRepertorioDAO } from '../../dao/MusicaRepertorioDAO';
import { ModalCadastrar } from './components/ModalCadastrar';
import { RepertorioDAO } from '../../dao/RepertorioDAO';

export const Repertorio: React.FC = () => {
	const [loading, setLoading] = useState(true);
	const [repertorios, setRepertorios] = useState<Repertorio[]>([]);
	const { navigate, setOptions } = useNavigation<any>();
	const [showModalCadastrar, setShowModalCadastrar] = useState(false);

	async function initialLoading() {
		setLoading(true);
		const repertorios_ = await RepertorioDAO.listar();
		setRepertorios(repertorios_);
		setLoading(false);
	}

	useEffect(() => {
		initialLoading();
	}, []);

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
				>
					<View className={`flex-row ${isActive ? 'bg-blue-100' : ''}`}>
						<TouchableOpacity
							className="p-4 flex-row flex-1 gap-3 items-center"
							onPress={() => navigate('MusicaRepertorioListar', { id: item.id })}
						>
							<AntDesign name="folder1" size={20} color="black" />
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

	async function handleUpdateOrdem(repertoriosOrdenados: Repertorio[]) {
		setRepertorios(repertoriosOrdenados);
		for (var num = 0; num < repertoriosOrdenados.length; num++) {
			await RepertorioDAO.atualizarOrdem({
				id: repertoriosOrdenados[num].id,
				ordem: num + 1
			});
		}
	}

	return (
		<View>
			<DraggableFlatList
				data={repertorios}
				className="h-full"
				keyExtractor={item => item.id.toString()}
				ItemSeparatorComponent={() => (
					<View className='h-[1px] w-full bg-gray-300'></View>
				)}
				renderItem={renderItem}
				onDragEnd={({ data }) => handleUpdateOrdem(data)}
			/>
			<ModalCadastrar
				show={showModalCadastrar}
				setShow={setShowModalCadastrar}
				callback={initialLoading}
			/>
		</View>
	);
};