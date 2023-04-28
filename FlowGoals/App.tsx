import React from 'react';
import { ThemeProvider } from 'react-native-rapi-ui';
import Navigation from './src/navigation';

export default function App() {
  return (
    <ThemeProvider theme="dark">
      <Navigation />
    </ThemeProvider>
  );
}
