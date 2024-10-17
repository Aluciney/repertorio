import { View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import FlashMessage from 'react-native-flash-message';
import { Routes } from './routes';

export const App: React.FC = () => {
	return (
		<View>
			<StatusBar translucent style="dark" />
			<Routes />
			<FlashMessage floating duration={5000} />
		</View>
	);
};