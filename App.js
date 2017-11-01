import React from 'react';
import { StackNavigator } from 'react-navigation';
import { Provider } from 'react-redux';
import theme from './src/theme';

// Screen imports
import Home from './src/screens/Home';
import Details from './src/screens/Details';

// React Redux integration
import store from './src/redux/store';

/**
 * Bootstrap component for the entire application
 */
const App = () => {
  // Create the navigator
  const Navigator = StackNavigator({
    Home: { screen: Home },
    Details: { screen: Details }
  });

  // Wrap it in the return value.  You can also use this
  // to inject any store providers for flux, as an example.
  return (
    <Provider store={store}>
      <Navigator/>
    </Provider>
  );
};

export default App;
