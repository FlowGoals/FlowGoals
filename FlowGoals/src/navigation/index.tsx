import React, { useContext, useEffect } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Main from './MainStack';
import Auth from './AuthStack';
import AuthContext from '../context/AuthContext';

function AuthHandler() {
  const { user, login } = useContext(AuthContext);

  useEffect(() => {
    const checkAuth = async () => {
      const username = await AsyncStorage.getItem('username');
      const password = await AsyncStorage.getItem('password');
      if (username && password) {
        login({ username, password });
      }
    };
    if (!user) {
      checkAuth();
    }
  }, []);

  return user ? <Main /> : <Auth />;
}

export default function App() {
  //   const auth = useContext(AuthContext);
  //   const user = auth.user;
  return (
    <NavigationContainer>
      <AuthHandler />
    </NavigationContainer>
  );
}
