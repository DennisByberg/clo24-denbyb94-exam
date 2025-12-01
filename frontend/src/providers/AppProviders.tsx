'use client';

import { MantineProvider } from '@mantine/core';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';
import { AuthProvider } from '@/contexts/AuthContext';
import { theme } from '@/theme/theme';

export default function AppProviders({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

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
