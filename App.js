/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {Provider, useDispatch, useSelector} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import Router from './app/navigation/navigator';
import {getUserProfile} from './app/redux/auth/auth.actions';
import {logoutUser} from './app/redux/auth/auth.reducer';
import {persistor, store} from './app/redux/store';
import {setAxiosInterceptors} from './app/utils/axios';

const App = () => {
  const token = useSelector((state) => state?.auth?.token);
  const dispatch = useDispatch();
  const logoutFromApp = () => dispatch(logoutUser());
  React.useEffect(() => {
    setAxiosInterceptors(token, logoutFromApp);
  }, [token]);
  React.useEffect(() => {
    if (token) dispatch(getUserProfile());
  }, [token]);
  return <Router token={token} />;
};

const AppWithStore = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  );
};

export default AppWithStore;
