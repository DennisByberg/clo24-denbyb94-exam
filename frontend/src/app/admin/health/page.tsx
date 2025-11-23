'use client';

import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/api/client';
import { Container, Title } from '@mantine/core';
import HealthCard from '@/components/HealthCard/HealthCard';

export default function HealthPage() {
  const { data, error, isLoading } = useQuery({
    queryKey: ['health'],
    queryFn: () => apiClient('/health'),
  });

  return (
    <Container>
      <Title order={1} mb="xl">
        Health Checks
      </Title>
      <HealthCard
        status={isLoading ? 'loading' : error ? 'error' : data?.status}
        error={error ? (error as Error).message : undefined}
      />
    </Container>
  );
}
