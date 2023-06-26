import React, { useContext } from 'react';

import { NavigationContainer } from '@react-navigation/native';

import Main from './MainStack';
import Auth from './AuthStack';
import AuthContext from '../context/AuthContext';

function AuthHandler() {
  const { user } = useContext(AuthContext);
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
