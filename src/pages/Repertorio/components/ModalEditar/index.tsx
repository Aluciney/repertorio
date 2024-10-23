import { useEffect, useState } from 'react';
import { Modal, View, Text, Alert, TouchableOpacity } from 'react-native';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { MaterialIcons } from '@expo/vector-icons';
import * as Yup from 'yup';

import { RepertorioDAO } from '../../../../dao/RepertorioDAO';
import { InputText } from '../../../../components/InputText';

const schema = Yup.object().shape({
	nome: Yup.string().required('Campo obrigatório').min(4, 'No mínimo 4 caracteres'),
});

type FormData = Yup.InferType<typeof schema>;

interface Props {
	show?: Repertorio;
	setShow: (state?: Repertorio) => void;
	callback: () => void;
}

export const ModalEditar: React.FC<Props> = ({ show, setShow, callback }) => {
	const { control, handleSubmit, reset } = useForm<FormData>({ resolver: yupResolver(schema) });
	const [loading, setLoading] = useState(false);

	const onSubmit: SubmitHandler<FormData> = async (data) => {
		if (!!show) {
			await RepertorioDAO.atualizar({ id: show.id, nome: data.nome });
			callback();
			reset();
			setShow(undefined);
		}
	}

	useEffect(() => {
		if (!!show) {
			reset({ nome: show.nome });
		}
	}, [show]);

	return (
		<Modal
			visible={!!show}
			onRequestClose={() => setShow(undefined)}
			animationType="slide"
			presentationStyle="formSheet"
		>
			<View className="flex-1 p-4">
				<View className="flex-row space-x-3 flex-1">
					<Controller
						name="nome"
						control={control}
						render={({ field, fieldState: { error } }) => (
							<InputText
								label="Nome"
								classNameContainer="flex-1"
								placeholder="Escreva o nome para o repertório"
								onChangeText={field.onChange}
								value={field.value}
								error={error?.message}
								autoFocus
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
						<MaterialIcons name="update" size={18} color="#FFF" />
						<Text className="text-white ml-1">Salvar</Text>
					</TouchableOpacity>
				</View>
			</View>
		</Modal>
	);
};