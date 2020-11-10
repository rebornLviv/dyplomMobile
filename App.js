/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import AsyncStorage from '@react-native-community/async-storage';
import React, { useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';
import { Provider, useDispatch, useSelector } from 'react-redux';
import Router from './navigation/navigator';
import { autoLogin } from './redux/auth/auth.actions';
import store from './redux/store';


const App= () => {
  const user = useSelector( state => state.auth.user)
  const dispatch = useDispatch()
  const checkForUser = () =>{
    AsyncStorage.getItem('user').then(
      user =>{
        if(!user) return
        let usetToSet =  JSON.parse(user)
        dispatch(autoLogin(usetToSet))

      }
    )
  }
  useEffect(
    () =>{
      checkForUser()
    },[]
  )
  return <Router user={user}  />
};

const AppWithStore = () => {
 return <Provider store={store}>
    <App/>
  </Provider>
}


export default AppWithStore;
