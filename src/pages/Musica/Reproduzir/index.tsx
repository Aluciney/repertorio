import { ScrollView, Text, View } from 'react-native';
import { activateKeepAwakeAsync, deactivateKeepAwake } from 'expo-keep-awake';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { setStatusBarHidden } from 'expo-status-bar';
import { useRoute } from '@react-navigation/native';
import { useEffect, useRef, useState } from 'react';
import { MusicaDAO } from '../../../dao/MusicaDAO';
import { Transpor } from '../../../utils/Transpor';

type Parte = string | JSX.Element;

export const Reproduzir: React.FC = () => {
	const insets = useSafeAreaInsets();
	const { params } = useRoute();
	const { id } = params as { id: number; };
	const [loading, setLoading] = useState(true);
	const [musica, setMusica] = useState<Musica>();

	useEffect(() => {
		setStatusBarHidden(true);
		// activateKeepAwakeAsync();
		return () => {
			setStatusBarHidden(false);
			// deactivateKeepAwake();
		};
	}, []);

	async function initialLoading() {
		setLoading(true);
		const musica = await MusicaDAO.visualizar({ id });
		setMusica(musica);
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

	const linhas: string[] = musica?.cifra.split('\n') || [];

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
		</View>
	);
};