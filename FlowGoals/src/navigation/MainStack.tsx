import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import MainTabs from './MainTabs';
// import Settings from '../screens/Profile/Settings';

const MainStack = createNativeStackNavigator();
function Main() {
  return (
    <MainStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <MainStack.Screen name="MainTabs" component={MainTabs} />
      {/* <MainStack.Screen name="Settings" component={Settings} /> */}
    </MainStack.Navigator>
  );
}

export default Main;
