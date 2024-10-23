import { useEffect, useRef, useState } from 'react';
import { Platform, Text, TouchableOpacity } from 'react-native';
import { View } from 'react-native';
import { Modalize } from 'react-native-modalize';
import { Portal } from 'react-native-portalize';
import { MaterialIcons } from '@expo/vector-icons';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { InputText } from '../../../../../components/InputText';
import { Transpor } from '../../../../../utils/Transpor';
import { MusicaDAO } from '../../../../../dao/MusicaDAO';

interface Props {
    musica?: Musica;
    tom: number;
    setTom: (tom: number) => void;
    show: boolean;
    setShow: (show: boolean) => void;
    callback?: () => void;
}

const schema = Yup.object().shape({
    nome: Yup.string().required('Campo obrigatório').min(4, 'No mínimo 4 caracteres'),
});

type FormData = Yup.InferType<typeof schema>;

export const ModalEditar: React.FC<Props> = ({ musica, tom, setTom, show, setShow , callback }) => {
    const modalizeRef = useRef<Modalize>(null);
    const [loading, setLoading] = useState(false);
    const { control, handleSubmit, reset } = useForm<FormData>({ resolver: yupResolver(schema) });

    const onSubmit: SubmitHandler<FormData> = async (data) => {
        if (!!musica) {
            setLoading(true);
            let cifra = musica.cifra;
            if (tom !== 0) {
                cifra = '';
                const linhas: string[] = musica?.cifra.split('\n') || [];
                for (var num = 0; num < linhas.length; num++) {
                    const partes = linhas[num].split(/(\s+)/);
                    const novasLinahas = partes.map((parte, index) => {
                        const isNota = /^[A-G](b|#)?(m|maj|min|dim|aug|sus|add|º)?\d*(M|b|#)?(\/[A-G](b|#)?)?$/.test(parte);
                        const texto = isNota ? Transpor.nota(parte, tom) : parte;
                        return texto;
                    });
                    cifra += novasLinahas.join('');
                    if (!!linhas[num + 1]) {
                        cifra += `\n`;
                    }
                }
            }
            await MusicaDAO.atualizar({ id: musica.id, nome: data.nome, cifra });
            setLoading(false);
            if(callback){
                callback();
                modalizeRef.current?.close();
            }
        }
    }

    useEffect(() => {
        if (show) {
            modalizeRef.current?.open();
        }
    }, [show]);

    useEffect(() => {
        if (!!musica) {
            reset({ nome: musica.nome });
        }
    }, [musica]);

    function onCloseModalize(){
        setTom(0);
        setShow(false);
    }

    return (
        <Portal>
            <Modalize
                ref={modalizeRef}
                useNativeDriver
                onClose={onCloseModalize}
                adjustToContentHeight
                // keyboardShouldPersistTaps="always"
            >
                <View className="px-4 pt-4 pb-12">
                    <View className="items-center">
                        <Text className="text-sm text-gray-400">Editar música</Text>
                    </View>
                    <View className="flex-row space-x-3 flex-1">
                        <Controller
                            name="nome"
                            control={control}
                            render={({ field, fieldState: { error } }) => (
                                <InputText
                                    label="Nome"
                                    classNameContainer="flex-1"
                                    placeholder="Escreva o nome da música"
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
                            <MaterialIcons name="update" size={18} color="#FFF" />
                            <Text className="text-white ml-1">Salvar</Text>
                        </TouchableOpacity>
                    </View>
                    <View className="items-center mt-2">
                        <Text className="text-sm text-gray-400">Editar tom</Text>
                    </View>
                    <View className="flex-row justify-between">
                        <TouchableOpacity
                            onPress={() => setTom(tom - 1)}
                            className={`px-8 py-2 bg-blue-400 rounded-md ${loading ? 'opacity-60' : ''}`}
                            disabled={loading}
                        >
                            <MaterialIcons name="exposure-minus-1" size={20} color="#FFF" />
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => setTom(tom + 1)}
                            className={`px-8 py-2 bg-blue-400 rounded-md ${loading ? 'opacity-60' : ''}`}
                            disabled={loading}
                        >
                            <MaterialIcons name="exposure-plus-1" size={20} color="#FFF" />
                        </TouchableOpacity>
                    </View>
                </View>
            </Modalize>
        </Portal>
    );
};