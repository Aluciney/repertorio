import { useEffect, useRef, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { Modal, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import FlashMessage from 'react-native-flash-message';
import { yupResolver } from '@hookform/resolvers/yup';
import { MaterialIcons } from '@expo/vector-icons';
import * as Yup from 'yup';
import axios from 'axios';

import { InputText } from '../../../../../components/InputText';
import { MusicaDAO } from '../../../../../dao/MusicaDAO';
import { useTheme } from '../../../../../contexts/theme';

const schema = Yup.object().shape({
	nome: Yup.string().required('Campo obrigatório').min(4, 'No mínimo 4 caracteres'),
});

type FormData = Yup.InferType<typeof schema>;

interface Props {
	show: boolean;
	setShow: (state: boolean) => void;
	callback: () => void;
}

export const ModalCadastrar: React.FC<Props> = ({ show, setShow, callback }) => {
	const { theme } = useTheme();
	const flashMessageRef = useRef<FlashMessage>(null);
	const { control, handleSubmit, reset } = useForm<FormData>({ resolver: yupResolver(schema) });
	const [loading, setLoading] = useState(false);

	const onSubmit: SubmitHandler<FormData> = async (data) => {
		let { nome, cifra = '' } = data as any;
		setLoading(true);
		if (data.nome.includes('https://')) {
			const resultado = await fetchCifraFromLink(data.nome);
			if (!(!!resultado)) {
				flashMessageRef.current?.showMessage({
					message: 'Erro ao localizar cifra',
					description: 'Cifra não encontrada. Tente outro link ou cadastre manualmente',
					type: 'danger',
					icon: 'danger'
				});
				setLoading(false);
				return;
			}
			nome = resultado.nome;
			cifra = resultado.letra;
		} else {
			nome = data.nome;
		}
		const musica = await MusicaDAO.porNome({ nome: nome });
		if (!!musica) {
			flashMessageRef.current?.showMessage({
				message: 'Música já cadastrada',
				description: 'Já existe uma música cadastrada com esse nome',
				type: 'danger',
				icon: 'danger'
			});
			setLoading(false);
			return;
		}
		await MusicaDAO.cadastrar({ nome, cifra });
		reset();
		setLoading(false);
		callback();
		setShow(false);
	}

	useEffect(() => {
		if (show) {
			reset({ nome: '' });
		}
	}, [show]);

	async function fetchCifraFromLink(link: string): Promise<{ nome: string; letra: string } | null> {
		try {
			const { data } = await axios.get(link);
			let nome = data.match(/<h1.*?>(.*?)<\/h1>/)?.[1] || '';
			let letra = data.match(/<pre.*?>([\s\S]*?)<\/pre>/)?.[1] || '';
			letra = letra.replaceAll('<b>', '').replaceAll('</b>', '');
			if (!(!!nome) || !(!!letra)) {
				return null;
			}
			return { nome, letra };
		} catch (error) {
			return null;
		}
	}

	return (
		<Modal
			visible={show}
			onRequestClose={() => setShow(false)}
			animationType="slide"
			presentationStyle="formSheet"
			
		>
			<ScrollView
				keyboardShouldPersistTaps="always"
				className="flex-1 p-4"
				style={{ backgroundColor: theme.background }}
			>
				<View className="flex-row space-x-3 flex-1">
					<Controller
						name="nome"
						control={control}
						render={({ field, fieldState: { error } }) => (
							<InputText
								label="Nome ou link"
								classNameContainer="flex-1"
								placeholder="Nome ou link da música"
								autoFocus
								onChangeText={field.onChange}
								value={field.value}
								error={error?.message}
								readOnly={loading}
								required
							/>
						)}
					/>
					<TouchableOpacity
						className={`px-4 flex-row bg-green-500 mt-[17px] items-center justify-center rounded-md h-[35px] ${loading ? 'opacity-60' : ''}`}
						onPress={handleSubmit(onSubmit)}
						disabled={loading}
					>
						<MaterialIcons name="add" size={18} color="#FFF" />
						<Text className="text-white ml-1">Cadastrar</Text>
					</TouchableOpacity>
				</View>
			</ScrollView>
			<FlashMessage ref={flashMessageRef} floating duration={5000} position="bottom" />
		</Modal>
	);
};