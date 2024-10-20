import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MusicaRepertorioListar } from './pages/MusicaRepertorio';
import { Repertorio } from './pages/Repertorio';
import { MusicaListar, MusicaVisualizar } from './pages/Musica';
import { AntDesign, Ionicons } from '@expo/vector-icons';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export const Routes: React.FC = () => {

	const StackRepertorio = () => (
		<Stack.Navigator>
			<Stack.Screen
				name="Repertorio"
				component={Repertorio}
				options={{ title: 'Repertórios' }}
			/>
			<Stack.Screen
				name="MusicaRepertorioListar"
				component={MusicaRepertorioListar}
				options={{ title: 'Músicas', headerBackTitle: 'Repertórios' }}
			/>
			<Stack.Screen
				name="MusicaRepertorioVisualizar"
				component={MusicaVisualizar}
				options={{ title: 'Cifra', headerBackTitle: 'Voltar' }}
			/>
		</Stack.Navigator>
	);

	const StackMusica = () => (
		<Stack.Navigator>
			<Stack.Screen
				name="MusicaListar"
				component={MusicaListar}
				options={{ title: 'Músicas' }}
			/>
			<Stack.Screen
				name="MusicaVisualizar"
				component={MusicaVisualizar}
				options={{ title: 'Cifra', headerBackTitle: 'Músicas' }}
			/>
		</Stack.Navigator>
	);

	return (
		<NavigationContainer>
			<Tab.Navigator>
				<Tab.Screen
					name="StackRepertorio"
					component={StackRepertorio}
					options={{ 
						tabBarLabel: 'Repertórios', 
						headerShown: false,
						tabBarIcon: ({ color, size, focused }) => (
							<AntDesign name="folder1" size={size} color={color} />
						)
					}}
				/>
				<Tab.Screen
					name="StackMusica"
					component={StackMusica}
					options={{ 
						tabBarLabel: 'Músicas',
						headerShown: false,
						tabBarIcon: ({ color, size, focused }) => (
							<Ionicons name="musical-notes-outline" size={size} color={color} />
						)
					 }}
				/>
			</Tab.Navigator>
		</NavigationContainer>
	);
};