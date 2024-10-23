import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { activateKeepAwakeAsync, deactivateKeepAwake } from 'expo-keep-awake';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { setStatusBarHidden } from 'expo-status-bar';
import { useRoute } from '@react-navigation/native';
import { useEffect, useRef, useState } from 'react';
import { MusicaRepertorioDAO } from '../../dao/MusicaRepertorioDAO';

type Parte = string | JSX.Element;

export const Reproduzir: React.FC = () => {
	const insets = useSafeAreaInsets();
	const { params } = useRoute();
	const { id } = params as { id: number; };
	const [loading, setLoading] = useState(true);
	const [musicas, setMusicas] = useState<Musica[]>([]);
	const [ordem, setOrdem] = useState(0);

	useEffect(() => {
		setStatusBarHidden(true);
		activateKeepAwakeAsync();
		return () => {
			setStatusBarHidden(false);
			deactivateKeepAwake();
		};
	}, []);

	async function initialLoading() {
		setLoading(true);
		const musicas_ = await MusicaRepertorioDAO.listar({ id_repertorio: id });
		setMusicas(musicas_);
		setLoading(false);
	}

	useEffect(() => {
		initialLoading();
	}, []);

	const formatarLinhaComNotas = (linha: string): Parte[] => {
		const partes = linha.split(/(\s+)/);
		return partes.map((parte, index) => {
			const isNota = /^[A-G](b|#)?(m|maj|min|dim|aug|sus|add|º)?\d*(M|b|#)?(\/[A-G](b|#)?)?$/.test(parte);
			return (
				<Text
					key={index}
					className={isNota ? 'font-bold' : ''}
				>
					{parte}
				</Text>
			);
		});
	};

	const linhas: string[] = musicas[ordem]?.cifra.split('\n') || [];

	return (
		<View className="flex-1 relative bg-black">
			<ScrollView
				scrollEventThrottle={16}
				contentContainerStyle={{
					paddingTop: insets.top + 20,
					paddingBottom: insets.bottom + 80
				}}
			>
				{linhas.map((linha, index) => (
					<Text key={index} className="px-4 text-[16px] text-white" style={{ fontFamily: 'Courier New' }}>
						{formatarLinhaComNotas(linha)}
					</Text>
				))}
			</ScrollView>
			<View
				className="absolute bottom-0 left-3 right-3 flex-row h-10 space-x-3 justify-between"
				style={{ marginBottom: insets.bottom }}
			>
				<TouchableOpacity
					className={`bg-gray-500 w-[100px] items-center justify-center rounded-md ${!(!!musicas[ordem - 1]) ? 'opacity-60' : ''}`}
					onPress={() => setOrdem(state => state - 1)}
					disabled={!(!!musicas[ordem - 1])}
				>
					<Text className="text-gray-300">Anterior</Text>
				</TouchableOpacity>
				<View className="items-center justify-center">
					<Text className="text-gray-300">{ordem + 1} de {musicas.length}</Text>
				</View>
				<TouchableOpacity
					className={`bg-gray-500 w-[100px] items-center justify-center rounded-md ${!(!!musicas[ordem + 1]) ? 'opacity-60' : ''}`}
					onPress={() => setOrdem(state => state + 1)}
					disabled={!(!!musicas[ordem + 1])}
				>
					<Text className="text-gray-300">Proxima</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
};