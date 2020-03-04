/**
 * @format
 */

import {AppRegistry} from 'react-native';
import React from 'react';
import App from './App';
import {name as appName} from './app.json';
import 'react-native-gesture-handler';

import { NetworkProvider } from './src/Helper/NetworkProvider/NetworkProvider';

import { Provider } from 'react-redux';
import configureStore from './src/Redux/Store';


const store = configureStore();


const RNRedux = () => (
  // <Provider store={store}>
  //   <NetworkProvider>
  //     <App />
  //   </NetworkProvider>
  // </Provider>

  <NetworkProvider>
    <Provider store={store}>
        <App />
    </Provider>
  </NetworkProvider>
)

AppRegistry.registerComponent(appName, () => RNRedux);
