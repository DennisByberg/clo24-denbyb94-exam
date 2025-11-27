'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Container, Skeleton, Stack } from '@mantine/core';
import { useAuth } from '@/hooks/useAuth';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

/**
 * Wrapper component that protects routes requiring authentication
 * @param children - Content to render if user is authenticated
 */
export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  // Redirect to login if user is not authenticated
  useEffect(() => {
    if (!isLoading && !user) {
      window.location.href = '/.auth/login/google';
    }
  }, [user, isLoading, router]);

  // Show loading skeleton while checking authentication
  if (isLoading) {
    return (
      <Container size="md" py="xl">
        <Stack gap="md">
          <Skeleton height={40} width="60%" />
          <Skeleton height={200} />
          <Skeleton height={150} />
        </Stack>
      </Container>
    );
  }

  // Return nothing while redirecting
  if (!user) {
    return null;
  }

  // User is authenticated - render protected content
  return <>{children}</>;
}
