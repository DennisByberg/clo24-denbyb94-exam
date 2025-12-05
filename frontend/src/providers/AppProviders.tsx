'use client';

import { MantineProvider } from '@mantine/core';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';
import { AuthProvider } from '@/contexts/AuthContext';
import { theme } from '@/theme/theme';

export default function AppProviders({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // Garbage collect unused queries after 5 minutes
            gcTime: 1000 * 60 * 5,
            // Data becomes stale after 1 minute
            staleTime: 1000 * 60,
            // Reduce unnecessary refetches
            refetchOnWindowFocus: false,
            retry: 1,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <MantineProvider defaultColorScheme={'dark'} theme={theme}>
          {children}
        </MantineProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}
