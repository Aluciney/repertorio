import { Text, TextInput, TextInputProps, TouchableOpacity, View } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { useState } from 'react';

interface Props extends TextInputProps {
	label?: string;
	passwordView?: boolean;
	error?: string;
	required?: boolean;
	icon?: React.ReactNode;
	classNameContainer?: string;
}

export const InputText: React.FC<Props> = ({ label, passwordView, error, icon, required, style, classNameContainer, placeholderTextColor, ...rest }) => {
	const [showPassword, setShowPassword] = useState(false);
	return (
		<View className={`gap-1 ${classNameContainer || ''}`}>
			{label && <Text className="text-[13px] text-white">{label} {required && <Text className="text-red-500">*</Text>}</Text>}
			<View className={`relative border-[1px] rounded-md ${error ? 'border-red-200' : 'border-zinc-500'}`}>
				{icon && (
					<View className="absolute inset-y-0 left-0 items-center pl-2 mt-2">
						{icon}
					</View>
				)}
				<TextInput
					className={`w-full text-white text-[17px] p-2 ${icon ? 'pl-8' : 'pl-2'}`}
					secureTextEntry={passwordView ? !showPassword : false}
					placeholderTextColor={placeholderTextColor || '#71717a'}
					{...rest}
				/>
				{passwordView && (
					<TouchableOpacity
						className="absolute h-full justify-center right-0 px-3"
						onPress={() => setShowPassword(state => !state)}
					>
						{showPassword && <FontAwesome5 name="eye" size={13} color="#00000060" />}
						{!showPassword && <FontAwesome5 name="eye-slash" size={13} color="#00000060" />}
					</TouchableOpacity>
				)}
			</View>
			{error && <Text className="text-red-500 text-[12px]">{error}</Text>}
		</View>
	);
};