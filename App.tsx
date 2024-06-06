import React from 'react';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {NavigationContainer} from '@react-navigation/native';
import 'react-native-gesture-handler';

import {NavigationTab} from './src/navigation/navigationTab';
import {persistor, store} from './src/redux/store';

function App(): JSX.Element {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <NavigationTab />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}

export default App;
