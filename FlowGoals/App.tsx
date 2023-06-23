import React from 'react';
import { ThemeProvider } from 'react-native-rapi-ui';
import { QueryClient, QueryClientProvider } from 'react-query';
import Navigation from './src/navigation';

export default function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <Navigation />
      </ThemeProvider>
    </QueryClientProvider>
  );
}
