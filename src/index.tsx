import { useEffect } from 'react';
import FlashMessage from 'react-native-flash-message';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';

import { ConfigurarBanco } from './database/iniciar-db';
import { Routes } from './routes';

SplashScreen.preventAutoHideAsync();

export const App: React.FC = () => {

	useEffect(() => {
		async function initialLoading() {
			await ConfigurarBanco();
			SplashScreen.hideAsync();
		}
		initialLoading();
	}, []);

	return (
		<View className="flex-1">
			<StatusBar translucent style="dark" />
			<Routes />
			<FlashMessage floating duration={5000} />
		</View>
	);
};