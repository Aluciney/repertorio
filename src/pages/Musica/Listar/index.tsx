import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { MusicaDAO } from '../../../dao/MusicaDAO';
import { NativeStackNavigationOptions } from '@react-navigation/native-stack';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { ModalCadastrar } from './components/ModalCadastrar';
import { InputText } from '../../../components/InputText';

export const Listar: React.FC = () => {
    const [loading, setLoading] = useState(true);
    const [showModalCadastrar, setShowModalCadastrar] = useState(false);
    const [musicas, setMusicas] = useState<Musica[]>([]);
    const { navigate, setOptions } = useNavigation<any>();

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
        const options: NativeStackNavigationOptions = {
            headerRight: () => (
                <TouchableOpacity
                    style={{ paddingRight: 10 }}
                    onPress={() => setShowModalCadastrar(true)}
                >
                    <MaterialCommunityIcons name="music-note-plus" size={24} color="black" />
                </TouchableOpacity>
            )
        };
        setOptions(options);
    }, []);

    return (
        <View>
            <FlatList
                data={musicas}
                className="h-full"
                keyExtractor={item => item.id.toString()}
                ItemSeparatorComponent={() => (
                    <View className='h-[1px] w-full bg-gray-300'></View>
                )}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        className="p-4 flex-row gap-3 items-center"
                        onPress={() => navigate('MusicaVisualizar', { id: item.id })}
                    >
                        <Ionicons name="musical-notes-outline" size={20} color="black" />
                        <Text className="text-lg">{item.nome}</Text>
                    </TouchableOpacity>
                )}
            />
            <ModalCadastrar
                show={showModalCadastrar}
                setShow={setShowModalCadastrar}
                callback={initialLoading}
            />
        </View>
    );
};