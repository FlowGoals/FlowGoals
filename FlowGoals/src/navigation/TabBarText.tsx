import React from 'react';
import { Text } from 'react-native-rapi-ui';
import { colors } from '../components/utils/Colors';

export default function TabBarText({ title, focused }: { title: string; focused: boolean }) {
  let color = colors.gray200;
  if (focused) {
    color = colors.dark100;
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
