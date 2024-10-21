import { useEffect, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { Modal, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import { InputText } from '../../../../../components/InputText';
import { MusicaDAO } from '../../../../../dao/MusicaDAO';

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

	const { control, handleSubmit, reset } = useForm<FormData>({ resolver: yupResolver(schema) });
	const [loading, setLoading] = useState(false);

	const onSubmit: SubmitHandler<FormData> = async (data) => {
		await MusicaDAO.cadastrar({ nome: data.nome, cifra: '' });
		callback();
		reset();
		setShow(false);
	}

	useEffect(() => {
		if (show) {
			reset({ nome: '' });
		}
	}, [show]);

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
			>
				<View className="flex-row space-x-3 flex-1">
					<Controller
						name="nome"
						control={control}
						render={({ field, fieldState: { error } }) => (
							<InputText
								label="Nome"
								classNameContainer="flex-1"
								placeholder="Escreva o nome da música"
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
						className="px-4 bg-green-400 mt-[17px] items-center justify-center rounded-md h-[35px]"
						onPress={handleSubmit(onSubmit)}
					>
						<Text className="text-white">
							Cadastrar
						</Text>
					</TouchableOpacity>
				</View>
			</ScrollView>
		</Modal>
	);
};