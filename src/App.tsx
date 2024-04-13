import React from 'react';

import { PrimaryNavigator } from './navigation';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar, StyleSheet } from 'react-native';

function App() {
  return (
    <SafeAreaProvider style={styles.container}>
      <StatusBar
        barStyle="light-content" // Here is where you change the font-color
      />
      <NavigationContainer>
        <PrimaryNavigator />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
