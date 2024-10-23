import { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigation, useRoute, useFocusEffect } from '@react-navigation/native';
import { NativeStackNavigationOptions } from '@react-navigation/native-stack';
import { Text, TouchableOpacity, ScrollView, View, } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';


import { MusicaDAO } from '../../../dao/MusicaDAO';
import { Transpor } from '../../../utils/Transpor';
import { ModalEditar } from './components/ModalEditar';

type Parte = string | JSX.Element;

export const Visualizar: React.FC = () => {
	const { params } = useRoute();
	const insets = useSafeAreaInsets();
	const { id, origem } = params as { id: number; origem: string; };
	const [loading, setLoading] = useState(true);
	const [musica, setMusica] = useState<Musica>();
	const { navigate, setOptions } = useNavigation<any>();
	const [tom, setTom] = useState(0);
	const [showModalEditar, setShowModalEditar] = useState(false);

	useEffect(() => {
		const options: NativeStackNavigationOptions = {
			headerRight: () => (
				<View className="flex-row">
					<TouchableOpacity
						className="px-2"
						onPress={() => {
							if (origem === 'MusicaRepertorio') {
								navigate('MusicaRepertorioEditar', { id });
							} else {
								navigate('MusicaEditar', { id });
							}
						}}
					>
						<MaterialCommunityIcons name="file-document-edit-outline" size={24} color="#888" />
					</TouchableOpacity>
					{origem !== 'MusicaRepertorio' && (
						<>
							<TouchableOpacity
								className="px-2"
								onPress={() => setShowModalEditar(true)}
							>
								<MaterialCommunityIcons name="cog-outline" size={24} color="#888" />
							</TouchableOpacity>
							<TouchableOpacity
								className="px-2"
								onPress={() => navigate('MusicaReproduzir', { id })}
							>
								<Ionicons name="play-outline" size={24} color="#888" />
							</TouchableOpacity>
						</>
					)}
				</View>
			)
		};
		setOptions(options);
	}, [tom]);

	async function initialLoading() {
		setLoading(true);
		const musica_ = await MusicaDAO.visualizar({ id });
		setMusica(musica_);
		setLoading(false);
	}

	useFocusEffect(
		useCallback(() => {
			initialLoading();
		}, [])
	);

	const formatarLinhaComNotas = (linha: string): Parte[] => {
		const partes = linha.split(/(\s+)/);
		return partes.map((parte, index) => {
			const isNota = /^[A-G](b|#)?(m|maj|min|dim|aug|sus|add|º)?\d*(M|b|#)?(\/[A-G](b|#)?)?$/.test(parte);
			const texto = isNota ? Transpor.nota(parte, tom) : parte;
			return (
				<Text
					key={index}
					className={isNota ? 'font-bold' : ''}
				>
					{texto}
				</Text>
			);
		});
	};

	const linhas: string[] = musica?.cifra.split('\n') || [];

	return (
		<View className="flex-1">
			<ScrollView
				className="flex-1 pt-4"
				scrollEventThrottle={16}
				contentContainerStyle={{
					paddingBottom: insets.bottom + 20
				}}
			>
				<Text className="px-4 font-bold text-black text-lg mb-4">{musica?.nome}</Text>
				{linhas.map((linha, index) => (
					<Text key={index} className="px-4 text-[16px] text-black" style={{ fontFamily: 'Courier New' }}>
						{formatarLinhaComNotas(linha)}
					</Text>
				))}
			</ScrollView>
			<ModalEditar
				musica={musica}
				tom={tom}
				setTom={setTom}
				show={showModalEditar}
				setShow={setShowModalEditar}
				callback={initialLoading}
			/>
		</View>
	);
};