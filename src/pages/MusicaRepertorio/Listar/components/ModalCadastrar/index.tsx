import { useEffect, useState } from 'react';
import { Modal, View, Text, Alert, TouchableOpacity, FlatList } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { FontAwesome } from '@expo/vector-icons';

import { MusicaRepertorioDAO } from '../../../../../dao/MusicaRepertorioDAO';
import { MusicaDAO } from '../../../../../dao/MusicaDAO';

interface Props {
	show: boolean;
	setShow: (state: boolean) => void;
	callback: () => void;
	id_repertorio: number;
}

export const ModalCadastrar: React.FC<Props> = ({ show, setShow, callback, id_repertorio }) => {
	const [loading, setLoading] = useState(false);
	const [musicas, setMusicas] = useState<Musica[]>([]);
	const [musicasSelecionadas, setMusicasSelecionadas] = useState<Musica[]>([]);
	const insets = useSafeAreaInsets();

	async function initialLoading() {
		setLoading(true);
		const musicas_ = await MusicaDAO.listar({}) as any;
		setMusicas(musicas_);
		setLoading(false);
	}

	useEffect(() => {
		initialLoading();
	}, []);

	useEffect(() => {
		if(show){
			setMusicasSelecionadas([]);
		}
	},[show]);

	const onSubmit = async () => {
		const { isConfirmed } = await new Promise<{ isConfirmed: boolean }>((resolve) => {
			Alert.alert(
				"Cadastrar musica",
				"Tem certeza que deseja cadastrar?",
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
			for (var num = 0; num < musicasSelecionadas.length; num++) {
				await MusicaRepertorioDAO.cadastrar({
					id_repertorio,
					id_musica: musicasSelecionadas[num].id,
					ordem: 1
				});
			}
			callback();
			setShow(false);
		}
	}

	function toogleSelectMusica(musica: Musica) {
		const musicaSelecionada = musicasSelecionadas.find(music_ => music_.id === musica.id);
		if (!!musicaSelecionada) {
			const musicasAtualizadas = musicasSelecionadas.filter(music_ => music_.id !== musica.id);
			setMusicasSelecionadas(musicasAtualizadas);
		} else {
			setMusicasSelecionadas(state => [...state, musica]);
		}
	}

	return (
		<Modal
			visible={show}
			onRequestClose={() => setShow(false)}
			animationType="slide"
			presentationStyle="formSheet"
		>
			<FlatList
				data={musicas}
				className="h-full"
				keyExtractor={item => item.id.toString()}
				ItemSeparatorComponent={() => (
					<View className='h-[1px] w-full bg-gray-300'></View>
				)}
				contentContainerStyle={{
					paddingBottom: insets.bottom
				}}
				renderItem={({ item }) => (
					<TouchableOpacity
						className="p-4 flex-row gap-3 items-center"
						onPress={() => toogleSelectMusica(item)}
					>
						{!!musicasSelecionadas.find(music_ => music_.id === item.id) ? (
							<FontAwesome name="check-square" size={20} color="green" />
						) : (
							<FontAwesome name="square-o" size={20} color="black" />
						)}
						<Text className="text-lg">{item.nome}</Text>
					</TouchableOpacity>
				)}
			/>
			<TouchableOpacity
				className="absolute p-2 bottom-0 left-4 right-4 bg-blue-500 rounded-md items-center"
				onPress={onSubmit}
				disabled={!(!!musicasSelecionadas.length)}
				style={{ marginBottom: insets.bottom }}
			>
				<Text className="text-white text-lg">Cadastrar</Text>
			</TouchableOpacity>
		</Modal>
	);
};