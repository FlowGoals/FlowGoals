import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { AuthStackParamList } from './types';
import LoginScreen from '../screens/Auth/LoginScreen';

const AuthStack = createNativeStackNavigator<AuthStackParamList>();
function Auth() {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen
        name="Login"
        component={LoginScreen}
        options={{ title: 'Login' }}
      />
    </AuthStack.Navigator>
  );
}

export default Auth;
