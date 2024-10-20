import { useEffect, useState } from 'react';
import { Alert, FlatList, Modal, Text, TouchableOpacity, View } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import { RepertorioDAO } from '../../dao/RepertorioDAO';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationOptions } from '@react-navigation/native-stack';
import { ModalCadastrar } from './components/ModalCadastrar';

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
					style={{ paddingRight: 10 }}
					onPress={() => setShowModalCadastrar(true)}
				>
					<AntDesign name="addfolder" size={22} color="black" />
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
						onPress={() => navigate('MusicaRepertorioListar', { id: item.id })}
					>
						<AntDesign name="folder1" size={20} color="black" />
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