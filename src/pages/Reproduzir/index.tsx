import { ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { setStatusBarHidden } from 'expo-status-bar';
import { activateKeepAwakeAsync, deactivateKeepAwake } from 'expo-keep-awake';
import { useEffect } from 'react';

export const Reproduzir: React.FC = () => {
	const insets = useSafeAreaInsets();

	useEffect(() => {
		setStatusBarHidden(true);
		activateKeepAwakeAsync();
		return () => {
			setStatusBarHidden(false);
			deactivateKeepAwake();
		};
	}, [])

	return (
		<ScrollView
			scrollEventThrottle={16}
			contentContainerStyle={{
				paddingTop: insets.top,
				paddingHorizontal: (4 * 4),
				paddingBottom: insets.bottom
			}}
		>

		</ScrollView>
	);
};