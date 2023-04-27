import React from 'react';
import { themeColor, useTheme } from 'react-native-rapi-ui';
import { Ionicons } from '@expo/vector-icons';

export default function TabBarIcon({ icon, focused }: { icon: any; focused: boolean }) {
  const { isDarkmode } = useTheme();
  let color = 'rgb(143, 155, 179)';
  if (focused) {
    color = isDarkmode ? themeColor.white100 : themeColor.primary;
  }
  return (
    <Ionicons
      name={icon}
      style={{ marginBottom: -7 }}
      size={24}
      color={color}
    />
  );
}
