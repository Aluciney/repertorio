import { useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ActionSheetProvider } from '@expo/react-native-action-sheet';
import FlashMessage from 'react-native-flash-message';
import { Host } from 'react-native-portalize';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';

import { ConfigurarBanco } from './database/iniciar-db';
import { Routes } from './routes';
import { ThemeProvider } from './contexts/theme';

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
		<GestureHandlerRootView>
			<ActionSheetProvider>
				<Host>
					<ThemeProvider>
						<View className="flex-1">
							<StatusBar translucent style="light" />
							<Routes />
							<FlashMessage floating duration={5000} position="bottom" />
						</View>
					</ThemeProvider>
				</Host>
			</ActionSheetProvider>
		</GestureHandlerRootView>
	);
};