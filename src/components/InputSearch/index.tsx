import { TextInput, TextInputProps, View } from 'react-native';
import Fontisto from '@expo/vector-icons/Fontisto';

interface Props extends TextInputProps {

}

export const InputSearch: React.FC<Props> = ({ ...rest }) => {

	return (
		<View className="relative m-4">
			<Fontisto
				name="search"
				size={16}
				color="#d1d5db"
				style={{ position: 'absolute', top: 10, left: 12 }}
			/>
			<TextInput
				className="border-[1px]  rounded-md border-gray-300 text-sm py-2 pl-9"
				placeholder="Buscar..."
				{...rest}
			/>
		</View>
	);
};