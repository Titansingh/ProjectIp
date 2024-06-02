import React from 'react';
import {PaperProvider} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
import MainNavigator from './src/navigations/MainStackNavigator';

function App(): React.JSX.Element {
  return (
    <PaperProvider>
      <SafeAreaView style={{flex: 1}}>
        <NavigationContainer>
          <MainNavigator />
        </NavigationContainer>
      </SafeAreaView>
    </PaperProvider>
  );
}

export default App;
