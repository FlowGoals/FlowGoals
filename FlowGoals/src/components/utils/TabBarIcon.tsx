import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { colors } from './Colors';

export default function TabBarIcon({ icon, focused }: { icon: any; focused: boolean }) {
  let color = 'rgb(143, 155, 179)';
  if (focused) {
    color = colors.white100;
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
