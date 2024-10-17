import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CifraListar, CifraVisualizar } from './pages/Cifra';
import { Repertorio } from './pages/Repertorio';

const Stack = createNativeStackNavigator();

export const Routes: React.FC = () => {

	const StackRepertorio = () => (
		<Stack.Navigator>
			<Stack.Screen name="Repertorio" component={Repertorio} />
			<Stack.Screen name="CifraListar" component={CifraListar} />
			<Stack.Screen name="CifraVisualizar" component={CifraVisualizar} />
		</Stack.Navigator>
	);

	return (
		<NavigationContainer>
			<Stack.Navigator>
				<Stack.Screen name="StackRepertorio" component={StackRepertorio} />
			</Stack.Navigator>
		</NavigationContainer>
	);
};