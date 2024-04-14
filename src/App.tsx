import React from 'react';

import { PrimaryNavigator } from './navigation';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar, StyleSheet } from 'react-native';
import { InitializeStore } from './rtk';
import { Provider } from 'react-redux';

function App() {
  const { reduxStore } = InitializeStore();
  return (
    <Provider store={reduxStore}>
      <SafeAreaProvider style={styles.container}>
        <StatusBar barStyle="light-content" />
        <NavigationContainer>
          <PrimaryNavigator />
        </NavigationContainer>
      </SafeAreaProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
