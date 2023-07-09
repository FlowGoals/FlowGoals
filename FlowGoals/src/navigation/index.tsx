import React, { useContext, useEffect, useState } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { View, Image, Text } from 'react-native';
import Main from './MainStack';
import Auth from './AuthStack';
import AuthContext from '../context/AuthContext';

function AuthHandler() {
  const { user, login } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const username = await AsyncStorage.getItem('username');
      const password = await AsyncStorage.getItem('password');
      if (username && password) {
        await login({ username, password });
      }
      setIsLoading(false);
    };
    if (!user) {
      checkAuth();
    }
  }, []);

  return isLoading ? (
    <View style={{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    }}
    >
      <Image
        // eslint-disable-next-line global-require
        source={require('../assets/icon.png')}
        style={{ width: 150, height: 150 }}
      />
      <Text>Loading...</Text>
    </View>
  ) : user ? <Main /> : <Auth />;
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
