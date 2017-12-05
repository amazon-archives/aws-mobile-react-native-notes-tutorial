import React from 'react';
import { StackNavigator } from 'react-navigation';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/es/integration/react';
import { navigatorConfig } from './src/screens';
import { persistor, store } from './src/redux/store';

const App = () => {
  const Navigator = StackNavigator(navigatorConfig);

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Navigator/>
      </PersistGate>
    </Provider>
  );
};

export default App;
