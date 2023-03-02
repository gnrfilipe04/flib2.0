import 'react-native-gesture-handler';

import { StatusBar } from 'expo-status-bar';
import { NativeBaseProvider, Center, Text, } from 'native-base';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { DragAndDropExample } from './src/screens/DragAndDropExample';
import { FlatList } from 'react-native';
import { useState } from 'react';
import { TimePickerExample } from './src/screens/TimePickerExample';
import { Comp } from './src/screens/Comp';

export default function App() {

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NativeBaseProvider>
        <TimePickerExample />
        {/* <Comp /> */}
        <StatusBar style="light" />
      </NativeBaseProvider>
    </GestureHandlerRootView>
  );
}

