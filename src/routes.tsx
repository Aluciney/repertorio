import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MusicaListar, MusicaVisualizar } from './pages/Musica';
import { Repertorio } from './pages/Repertorio';

const Stack = createNativeStackNavigator();

export const Routes: React.FC = () => {

	return (
		<NavigationContainer>
			<Stack.Navigator>
				<Stack.Screen name="Repertorio" component={Repertorio} />
				<Stack.Screen name="MusicaListar" component={MusicaListar} />
				<Stack.Screen name="MusicaVisualizar" component={MusicaVisualizar} />
			</Stack.Navigator>
		</NavigationContainer>
	);
};