import { Text, View, Modal, TouchableOpacity, FlatList, SafeAreaView } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useEffect, useMemo, useState } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { InputText } from '../InputText';

interface Props {
	label: string;
	data: SelectDataProps[];
	onSelect: (data: SelectDataProps) => void;
	value?: SelectDataProps;
	error?: string;
	disabled?: boolean;
	loading?: boolean;
	classNameContainer?: string;
	required?: boolean;
}

export interface SelectDataProps {
	label: string;
	value: string;
	disabled?: boolean;
}

export const SelectText: React.FC<Props> = ({ label, data, value, loading, onSelect, classNameContainer, error, disabled, required }) => {
	const [showOptions, setShowOptions] = useState(false);
	const [search, setSearch] = useState('');

	const Header = useMemo(() => (
		<View className="p-3 items-center mb-2 bg-gray-50 flex-row gap-3">
			<View className="flex-1 bg-white">
				<InputText
					autoFocus
					autoComplete="off"
					autoCorrect={false}
					autoCapitalize="characters"
					placeholder="Buscar..."
					placeholderTextColor="#00000050"
					onChangeText={setSearch}
					value={search}
					icon={<Ionicons name="search-outline" size={18} color="#00000020" />}
				/>
			</View>
			<TouchableOpacity
				className="p-3 rounded-md"
				activeOpacity={0.7}
				onPress={() => setShowOptions(false)}
			>
				<Text className="text-[18px] text-primary-500">Cancelar</Text>
			</TouchableOpacity>
		</View>
	), [search]);

	useEffect(() => {
		if (!!showOptions) {
			setSearch('');
		}
	}, [showOptions])

	return (
		<View className={`gap-1 ${classNameContainer || ''}`}>
			<Text className="text-[13px]">{label} {required && <Text className="text-red-500">*</Text>}</Text>
			<TouchableOpacity
				className={`relative border-[1px] rounded-md ${error ? 'border-red-200' : 'border-gray-200'}`}
				onPress={() => setShowOptions(true)}
				disabled={disabled}
			>
				{!!value ? (
					<Text className="w-full text-[17px] p-2 pr-4 text-gray-900">
						{value.label}
					</Text>
				) : (
					<Text className="w-full text-[17px] p-2 pr-4 text-gray-400">
						Selecione um...
					</Text>
				)}
				<View className="absolute h-full right-2 items-center justify-center">
					<MaterialIcons name="arrow-forward-ios" size={12} color="#00000030" />
				</View>
			</TouchableOpacity>
			{error && <Text className="text-red-500 text-[12px]">{error}</Text>}
			<Modal
				visible={showOptions}
				presentationStyle="formSheet"
				animationType="slide"
				onRequestClose={() => setShowOptions(false)}
			>
				<SafeAreaView className="bg-gray-50 flex-1">
					<FlatList<SelectDataProps>
						data={data.filter(item => item.label.toUpperCase().includes(search.toUpperCase()))}
						keyboardShouldPersistTaps="handled"
						ListHeaderComponent={Header}
						stickyHeaderIndices={[0]}
						keyExtractor={(item, index) => index.toString()}
						renderItem={({ item }) => (
							<TouchableOpacity
								className={`relatice justify-center py-3 px-3 mb-2 mx-4 rounded-md border-[1px] ${value?.value === item.value ? 'border-secondary-500' : 'border-gray-200'} bg-white ${item.disabled && 'opacity-50'}`}
								disabled={item.disabled}
								onPress={() => {
									onSelect(item);
									setShowOptions(false);
								}}
							>
								<Text className="text-sm pr-6" numberOfLines={1} >
									{item.label}
								</Text>
								{value?.value === item.value && (
									<View className="absolute right-3">
										<Ionicons name="checkmark-circle" size={18} color="#7FA323" />
									</View>
								)}
							</TouchableOpacity>
						)}
					/>
				</SafeAreaView>
			</Modal>
		</View>
	);
};