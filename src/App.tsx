import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ChakraProvider } from '@chakra-ui/react';

import { AppRouter } from './router/AppRouter';
import { ErrorBoundary } from './components/common/ErrorBoundary';
import { theme } from './styles/theme';

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      cacheTime: 10 * 60 * 1000, // 10 minutes
      retry: (failureCount, error: any) => {
        // Don't retry on 4xx errors
        if (error?.response?.status >= 400 && error?.response?.status < 500) {
          return false;
        }
        return failureCount < 3;
      },
    },
    mutations: {
      retry: false,
    },
  },
});

export const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <ChakraProvider theme={theme}>
            <AppRouter />
            {import.meta.env.DEV && <ReactQueryDevtools initialIsOpen={false} />}
          </ChakraProvider>
        </QueryClientProvider>
      </BrowserRouter>
    </ErrorBoundary>
  );
};
