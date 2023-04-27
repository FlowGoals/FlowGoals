import React from 'react';
import { Text, themeColor, useTheme } from 'react-native-rapi-ui';

export default function TabBarText({ title, focused }: { title: string; focused: boolean }) {
  const { isDarkmode } = useTheme();
  let color = 'rgb(143, 155, 179)';
  if (focused) {
    color = isDarkmode ? themeColor.white100 : themeColor.primary;
  }
  return (
    <Text
      fontWeight="bold"
      style={{
        marginBottom: 5,
        color,
        fontSize: 10,
      }}
    >
      {title}
    </Text>
  );
}
