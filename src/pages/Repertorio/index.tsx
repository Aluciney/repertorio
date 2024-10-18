import { useEffect, useState } from 'react';
import { Alert, FlatList, Modal, Text, TouchableOpacity, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { RepertorioDAO } from '../../dao/RepertorioDAO';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationOptions } from '@react-navigation/native-stack';
import { ModalCadastrar } from './components/ModalCadastrar';

export const Repertorio: React.FC = () => {
	const { setOptions } = useNavigation();
	const [loading, setLoading] = useState(true);
	const [repertorios, setRepertorios] = useState<Repertorio[]>([]);
	const { navigate } = useNavigation<any>();
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
					style={{ paddingRight: 10 }}
					onPress={() => setShowModalCadastrar(true)}
				>
					<Ionicons name="add-circle-outline" size={30} color="black" />
				</TouchableOpacity>
			)
		};
		setOptions(options);
	}, []);


	return (
		<View>
			<FlatList
				data={repertorios}
				className="h-full"
				keyExtractor={item => item.id.toString()}
				ItemSeparatorComponent={() => (
					<View className='h-[1px] w-full bg-gray-300'></View>
				)}
				renderItem={({ item }) => (
					<TouchableOpacity
						className="p-4 flex-row gap-3 items-center"
						onPress={() => navigate('MusicaListar', { id: item.id })}
					>
						<Ionicons name="folder-open-outline" size={20} color="black" />
						<Text className="text-lg">{item.nome}</Text>
					</TouchableOpacity>
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