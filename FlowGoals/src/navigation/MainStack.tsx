import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import * as SQLite from 'expo-sqlite';
import MainTabs from './MainTabs';
import { MainStackParamList } from './types';
import Settings from '../screens/Profile/Settings';
import FAQ from '../screens/Profile/FAQ';
import NewGoal from '../screens/Goals/NewGoal';

const MainStack = createNativeStackNavigator<MainStackParamList>();
function Main() {
  // const db = SQLite.openDatabase('localStorage.db');
  return (
    <MainStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <MainStack.Screen name="MainTabs" component={MainTabs} />
      <MainStack.Screen name="settings" component={Settings} />
      <MainStack.Screen name="faq" component={FAQ} />
      <MainStack.Screen
        name="newgoal"
        component={NewGoal}
        options={{ animation: 'fade_from_bottom' }}
      />

    </MainStack.Navigator>
  );
}

export default Main;
