import { useEffect, useState } from 'react';
import Animated, { useSharedValue, withTiming, useAnimatedStyle } from 'react-native-reanimated';
import { activateKeepAwakeAsync, deactivateKeepAwake } from 'expo-keep-awake';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { setStatusBarHidden } from 'expo-status-bar';
import { useRoute } from '@react-navigation/native';

import { MusicaRepertorioDAO } from '../../dao/MusicaRepertorioDAO';
import { Transpor } from '../../utils/Transpor';

type Parte = string | JSX.Element;

export const Reproduzir: React.FC = () => {
	const insets = useSafeAreaInsets();
	const { params } = useRoute();
	const { id } = params as { id: number; };
	const [loading, setLoading] = useState(true);
	const [musicas, setMusicas] = useState<Musica[]>([]);
	const [ordem, setOrdem] = useState(0);
	const [tom, setTom] = useState(0);
	const [tamanhoFonte, setTamanhoFonte] = useState(16);
	const [visualizarConfiguracao, setVisualizarConfiguracao] = useState(false);

	const opacity = useSharedValue(0);
	const translateY = useSharedValue(50);

	const animatedStyle = useAnimatedStyle(() => ({
		opacity: opacity.value,
		transform: [{ translateY: translateY.value }],
	}));

	const toggleView = () => {
		if (visualizarConfiguracao) {
			opacity.value = withTiming(0, { duration: 200 });
			translateY.value = withTiming(50, { duration: 200 });
		} else {
			opacity.value = withTiming(1, { duration: 200 });
			translateY.value = withTiming(0, { duration: 200 });
		}
		setVisualizarConfiguracao(prev => !prev);
	};

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

	const linhas: string[] = musicas[ordem]?.cifra.split('\n') || [];

	const tabGesture = Gesture.Tap()
		.numberOfTaps(1)
		.minPointers(1)
		.onEnd(() => {
			toggleView();
		})
		.runOnJS(true);

	useEffect(() => {
		setTom(0);
	}, [ordem]);

	return (
		<View className="flex-1 relative bg-black">
			<GestureDetector gesture={tabGesture}>
				<ScrollView
					scrollEventThrottle={16}
					contentContainerStyle={{
						paddingTop: insets.top + 20,
						paddingBottom: insets.bottom + 80
					}}
				>
					<Text className="px-4 font-bold text-white text-lg mb-4">{musicas[ordem]?.nome}</Text>
					{linhas.map((linha, index) => (
						<Text key={index} className="px-4 text-white" text-white style={{ fontFamily: 'Courier New', fontSize: tamanhoFonte }}>
							{formatarLinhaComNotas(linha)}
						</Text>
					))}
				</ScrollView>
			</GestureDetector>
			<Animated.View
				className="absolute bottom-0 left-3 right-3 space-y-3"
				style={[{ paddingBottom: insets.bottom }, animatedStyle]}
			>
				<View className="flex-row h-10 space-x-3 justify-between">
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
				<View className="flex-row h-10 space-x-3 justify-between">
					<TouchableOpacity
						className={`bg-gray-500 w-[80px] items-center justify-center rounded-md ${tamanhoFonte === 16 ? 'opacity-60' : ''}`}
						onPress={() => setTamanhoFonte(state => state - 1)}
						disabled={tamanhoFonte === 16}
					>
						<Text className="text-gray-300">Fonte -</Text>
					</TouchableOpacity>
					<View className="items-center justify-center">
						<Text className="text-gray-300">{tamanhoFonte}px</Text>
					</View>
					<TouchableOpacity
						className={`bg-gray-500 w-[80px] items-center justify-center rounded-md  ${tamanhoFonte === 25 ? 'opacity-60' : ''}`}
						onPress={() => setTamanhoFonte(state => state + 1)}
						disabled={tamanhoFonte === 25}
					>
						<Text className="text-gray-300">Fonte +</Text>
					</TouchableOpacity>
				</View>
				<View className="flex-row h-10 space-x-3 justify-between">
					<TouchableOpacity
						className={`bg-gray-500 w-[60px] items-center justify-center rounded-md`}
						onPress={() => setTom(state => state - 1)}
					>
						<Text className="text-gray-300">Tom -</Text>
					</TouchableOpacity>
					<View className="items-center justify-center">
						<Text className="text-gray-300">{tom > 0 ? '+' : ''}{tom}</Text>
					</View>
					<TouchableOpacity
						className={`bg-gray-500 w-[60px] items-center justify-center rounded-md `}
						onPress={() => setTom(state => state + 1)}
					>
						<Text className="text-gray-300">Tom +</Text>
					</TouchableOpacity>
				</View>
			</Animated.View>
		</View>
	);
};