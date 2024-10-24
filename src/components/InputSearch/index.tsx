import { TextInput, TextInputProps, View } from 'react-native';
import Fontisto from '@expo/vector-icons/Fontisto';
import { useTheme } from '../../contexts/theme';

interface Props extends TextInputProps {

}

export const InputSearch: React.FC<Props> = ({ ...rest }) => {
	const { theme } = useTheme();

	return (
		<View className="relative p-4" style={{ backgroundColor: theme.background }}>
			<Fontisto
				name="search"
				size={16}
				color="#505050"
				style={{ position: 'absolute', top: 26, left: 26 }}
			/>
			<TextInput
				className="border-[1px]  rounded-md border-zinc-500 text-sm py-2 pl-8 text-white"
				placeholder="Buscar..."
				placeholderTextColor="#71717a"
				{...rest}
			/>
		</View>
	);
};