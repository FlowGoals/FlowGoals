import React from 'react';
import { ThemeProvider } from 'react-native-rapi-ui';
import { QueryClient, QueryClientProvider } from 'react-query';
import Navigation from './src/navigation';
import AuthProvider from './src/context/AuthProvider';

export default function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ThemeProvider>
          <Navigation />
        </ThemeProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}
