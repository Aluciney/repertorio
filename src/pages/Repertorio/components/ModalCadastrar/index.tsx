import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { Modal, View, Text, Alert } from 'react-native';
import { InputText } from '../../../../components/InputText';
import { useState } from 'react';

const schema = Yup.object().shape({
	nome: Yup.string().required('Campo obrigatório').min(8, 'No mínimo 8 caracteres'),
});

type FormData = Yup.InferType<typeof schema>;

interface Props {
	show: boolean;
	setShow: (state: boolean) => void;
	callback: () => void;
}

export const ModalCadastrar: React.FC<Props> = ({ show, setShow, callback }) => {

	const { control } = useForm<FormData>({ resolver: yupResolver(schema) });
	const [loading, setLoading] = useState(false);

	const onSubmit: SubmitHandler<FormData> = async (data) => {
		const { isConfirmed } = await new Promise<{ isConfirmed: boolean }>((resolve) => {
			Alert.alert(
				"Cadastrar repertório",
				"Tem certeza que deseja solicitar?",
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
			callback();
			setShow(false);
		}
	}

	return (
		<Modal
			presentationStyle="formSheet"
			visible={show}
			onRequestClose={() => setShow(false)}
		>
			<View>
				<Text>Digite algo:</Text>
				<Controller
					name="nome"
					control={control}
					render={({ field, fieldState: { error } }) => (
						<InputText
							label="Nome"
							placeholder="Escreva o nome para o repertório"
							onChangeText={field.onChange}
							value={field.value}
							error={error?.message}
							keyboardType="number-pad"
							readOnly={loading}
							required
						/>
					)}
				/>
				
			</View>
		</Modal>
	);
};