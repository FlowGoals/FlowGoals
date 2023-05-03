import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../components/utils/Colors';

export default function TabBarIcon({ icon, focused }: { icon: any; focused: boolean }) {
  let color = colors.gray200;
  if (focused) {
    color = colors.dark100;
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
