import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { AuthStackParamList } from './types';
import LoginScreen from '../screens/loginScreen';
import SignupScreen from '../screens/signupScreen';

const AuthStack = createNativeStackNavigator<AuthStackParamList>();
function Auth() {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen
        name="Login"
        component={LoginScreen}
        options={{ title: 'Login' }}
      />
      <AuthStack.Screen
        name="Signup"
        component={SignupScreen}
        options={{ title: 'Sign Up' }}
      />
    </AuthStack.Navigator>
  );
}

export default Auth;
