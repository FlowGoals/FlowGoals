import React from 'react';
import { Text } from 'react-native-rapi-ui';
import { colors } from './Colors';

export default function TabBarText({ title, focused }: { title: string; focused: boolean }) {
  let color = 'rgb(143, 155, 179)';
  if (focused) {
    color = colors.white100;
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
