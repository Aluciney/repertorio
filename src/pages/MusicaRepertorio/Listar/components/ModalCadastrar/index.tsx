import { useEffect, useState } from 'react';
import { Modal, View, Text, TouchableOpacity, FlatList, TextInput, KeyboardAvoidingView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';

import { MusicaRepertorioDAO } from '../../../../../dao/MusicaRepertorioDAO';
import { MusicaDAO } from '../../../../../dao/MusicaDAO';
import { useTheme } from '../../../../../contexts/theme';

interface Props {
	show: boolean;
	setShow: (state: boolean) => void;
	callback: () => void;
	id_repertorio: number;
}

export const ModalCadastrar: React.FC<Props> = ({ show, setShow, callback, id_repertorio }) => {
	const { theme } = useTheme();
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
			<FlatList
				data={musicas.filter(music => music.nome.toLowerCase().includes(search.toLowerCase()))}
				keyExtractor={item => item.id.toString()}
				keyboardShouldPersistTaps="always"
				automaticallyAdjustKeyboardInsets
				ItemSeparatorComponent={() => (
					<View className="h-[1px] w-full bg-zinc-800"></View>
				)}
				stickyHeaderIndices={[0]}
				ListHeaderComponent={(
					<View className="p-4" style={{ backgroundColor: theme.background }}>
						<View className="flex-row justify-end">
							<TouchableOpacity
								className={`p-1 items-center justify-center rounded-full border-[1px] border-red-900`}
								onPress={() => setShow(false)}
								disabled={loading}
							>
								<MaterialIcons name="close" size={18} color="#f00" />
							</TouchableOpacity>
						</View>
						<View className="flex-row space-x-3 mt-4">
							<View className="flex-1">
								<TextInput
									className="border-[1px] rounded-md border-zinc-500 text-sm p-2 text-white"
									placeholder="Buscar..."
									placeholderTextColor="#71717a"
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
					</View>
				)}
				contentContainerStyle={{ paddingBottom: 10 }}
				style={{ backgroundColor: theme.background }}
				renderItem={({ item }) => (
					<TouchableOpacity
						className="p-4 flex-row gap-3 items-center max-w-full"
						onPress={() => toogleSelectMusica(item)}
					>
						{!!musicasSelecionadas.find(music_ => music_.id === item.id) ? (
							<FontAwesome name="check-square" size={20} color="green" />
						) : (
							<FontAwesome name="square-o" size={20} color="#505050" />
						)}
						<Text className="text-lg text-white truncate pr-4" numberOfLines={1}>{item.nome}</Text>
					</TouchableOpacity>
				)}
			/>
		</Modal>
	);
};