import 'react-native-gesture-handler';

import { StatusBar } from 'expo-status-bar';
import { NativeBaseProvider, } from 'native-base';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { DragAndDropExample } from './src/screens/DragAndDropExample';

export default function App() {

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NativeBaseProvider>
        <DragAndDropExample />
        <StatusBar style="light" />
      </NativeBaseProvider>
    </GestureHandlerRootView>
  );
}

