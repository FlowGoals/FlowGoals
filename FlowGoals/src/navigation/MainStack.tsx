import React, { useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SQLError } from 'expo-sqlite';
import MainTabs from './MainTabs';
import { MainStackParamList } from './types';
import Settings from '../screens/ProfileScreen/Settings';
import FAQ from '../screens/ProfileScreen/FAQ';
import NewGoal from '../screens/GoalsScreen/NewGoal';
import { CREATE_TABLE_GOAL } from '../services/sqliteService';
import SqliteInterface from '../screens/ProfileScreen/SqliteInterface';

const MainStack = createNativeStackNavigator<MainStackParamList>();
function Main() {
  useEffect(() => {
    CREATE_TABLE_GOAL().catch((err: SQLError) => console.log(err.message));
  }, []);
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
      <MainStack.Screen name="sqliteInterface" component={SqliteInterface} />

    </MainStack.Navigator>
  );
}

export default Main;
