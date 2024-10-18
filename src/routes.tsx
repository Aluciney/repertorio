import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MusicaListar, MusicaVisualizar } from './pages/Musica';
import { Repertorio } from './pages/Repertorio';

const Stack = createNativeStackNavigator();

export const Routes: React.FC = () => {

	return (
		<NavigationContainer>
			<Stack.Navigator>
				<Stack.Screen
					name="Repertorio"
					component={Repertorio}
					options={{ title: 'Repertórios' }}
				/>
				<Stack.Screen
					name="MusicaListar"
					component={MusicaListar}
					options={{ title: 'Músicas', headerBackTitle: 'Repertórios' }}
				/>
				<Stack.Screen
					name="MusicaVisualizar"
					component={MusicaVisualizar}
					options={{ title: 'Cifra', headerBackTitle: 'Voltar' }}
				/>
			</Stack.Navigator>
		</NavigationContainer>
	);
};