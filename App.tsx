import 'react-native-gesture-handler';
import {
	configureReanimatedLogger,
	ReanimatedLogLevel,
} from 'react-native-reanimated';

configureReanimatedLogger({ level: ReanimatedLogLevel.warn, strict: false });

import React from 'react';
import { App } from './src';
const Index: React.FC = () => <App />;
export default Index;