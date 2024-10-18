import { Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface Props {
	label: string;
	classNameContainer?: string;
	error?: string;
	checked?: boolean;
	disabled?: boolean;
	required?: boolean;
	onChangeCheck: () => void;
}

export const Checkbox: React.FC<Props> = ({ label, classNameContainer, checked, onChangeCheck, error, required, disabled }) => {
	return (
		<View className={`gap-1 ${classNameContainer || ''}`}>
			<TouchableOpacity
				activeOpacity={0.7}
				onPress={onChangeCheck}
				className="flex-row items-center justify-start py-1"
				disabled={disabled}
			>
				{checked && (
					<Ionicons name="checkmark-circle" size={20} color="#06a700" />
				)}
				{!checked && (
					<MaterialCommunityIcons name="checkbox-blank-circle-outline" size={20} color="#00000050" />
				)}
				<Text className="text-[16px] ml-2 pr-4">{label} {required && <Text className="text-red-500">*</Text>}</Text>
			</TouchableOpacity>
			{error && <Text className="text-red-500 text-[12px]">{error}</Text>}
		</View>
	);
}