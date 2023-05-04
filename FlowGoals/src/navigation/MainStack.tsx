import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import MainTabs from './MainTabs';
import { MainStackParamList } from './types';
import Settings from '../screens/Profile/Settings';
import FAQ from '../screens/Profile/FAQ';

const MainStack = createNativeStackNavigator<MainStackParamList>();
function Main() {
  return (
    <MainStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <MainStack.Screen name="MainTabs" component={MainTabs} />
      <MainStack.Screen name="settings" component={Settings} />
      <MainStack.Screen name="faq" component={FAQ} />

    </MainStack.Navigator>
  );
}

export default Main;
