/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { Provider, useSelector } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import Router from './navigation/navigator';
import  { persistor, store } from './redux/store';


const App= () => {
  const token = useSelector( state => state?.auth?.token)
  
  return <Router token={token}  />
};

const AppWithStore = () => {
 return <Provider store={store}>
   <PersistGate loading={null} persistor={persistor}>
    <App/>
    </PersistGate>
  </Provider>
}


export default AppWithStore;
