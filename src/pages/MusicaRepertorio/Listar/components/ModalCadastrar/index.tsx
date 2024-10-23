import { useEffect, useState } from 'react';
import { Modal, View, Text, TouchableOpacity, FlatList, TextInput } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';

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
	const [search, setSearch] = useState('');

	async function initialLoading() {
		setLoading(true);
		const musicas_ = await MusicaDAO.listarSemVinculo({ id_repertorio }) as any;
		setMusicas(musicas_);
		setLoading(false);
	}

	useEffect(() => {
		if (show) {
			initialLoading();
		}
	}, [show]);

	useEffect(() => {
		if (show) {
			setMusicasSelecionadas([]);
		}
	}, [show]);

	const onSubmit = async () => {
		const musicas = await MusicaRepertorioDAO.listar({ id_repertorio });
		const ultima_musica = musicas.slice(-1)[0];
		let ordem_atual = ultima_musica?.ordem || 0;
		for (var num = 0; num < musicasSelecionadas.length; num++) {
			ordem_atual += 1;
			await MusicaRepertorioDAO.cadastrar({
				id_repertorio,
				id_musica: musicasSelecionadas[num].id,
				ordem: ordem_atual
			});
		}
		callback();
		setShow(false);
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
			
			<View className="flex-row space-x-3 p-4">
				<View className="flex-1">
					<TextInput
						className="border-[1px] rounded-md border-gray-300 text-sm p-2"
						placeholder="Buscar..."
						placeholderTextColor="#555"
						value={search}
						onChangeText={setSearch}
						autoFocus
					/>
				</View>
				<TouchableOpacity
					className={`px-4 flex-row bg-green-500 items-center justify-center rounded-md h-[35px] ${!(!!musicasSelecionadas.length) ? 'opacity-60' : ''}`}
					onPress={onSubmit}
					disabled={!(!!musicasSelecionadas.length)}
				>
					<MaterialIcons name="add" size={18} color="#FFF" />
					<Text className="text-white ml-1">Cadastrar</Text>
				</TouchableOpacity>
			</View>
			<FlatList
				data={musicas.filter(music => music.nome.toLowerCase().includes(search.toLowerCase()))}
				className="h-full"
				keyExtractor={item => item.id.toString()}
				keyboardShouldPersistTaps="always"
				automaticallyAdjustKeyboardInsets
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
		</Modal>
	);
};