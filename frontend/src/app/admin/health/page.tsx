'use client';

import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/api/client';
import { Container, Title, SimpleGrid } from '@mantine/core';
import {
  IconServer,
  IconDatabase,
  IconShieldLock,
  IconUsers,
  IconClock,
} from '@tabler/icons-react';
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
      <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
        {/* API STATUS */}
        <HealthCard
          title="API Status"
          icon={<IconServer size={20} color="var(--mantine-color-dimmed)" />}
          status={isLoading ? 'loading' : error ? 'error' : data?.api_status || 'unknown'}
          error={error ? (error as Error).message : undefined}
        />
        {/* DATABASE STATUS */}
        <HealthCard
          title="Database"
          icon={<IconDatabase size={20} color="var(--mantine-color-dimmed)" />}
          status={isLoading ? 'loading' : error ? 'error' : data?.database_status || 'unknown'}
          error={error ? (error as Error).message : undefined}
        />
        {/* AUTHENTICATION STATUS */}
        <HealthCard
          title="Authentication"
          icon={<IconShieldLock size={20} color="var(--mantine-color-dimmed)" />}
          status={
            isLoading
              ? 'loading'
              : error
                ? 'error'
                : data?.auth_mode
                  ? `${data.auth_mode} mode`
                  : 'unknown'
          }
          error={error ? (error as Error).message : undefined}
        />
        {/* USER COUNT STATUS */}
        <HealthCard
          title="Users"
          icon={<IconUsers size={20} color="var(--mantine-color-dimmed)" />}
          status={
            isLoading
              ? 'loading'
              : error
                ? 'error'
                : data?.user_count !== undefined
                  ? `${data.user_count} users`
                  : 'unknown'
          }
          error={error ? (error as Error).message : undefined}
        />
        {/* RESPONSE TIME */}
        <HealthCard
          title="Response Time"
          icon={<IconClock size={20} color="var(--mantine-color-dimmed)" />}
          status={
            isLoading
              ? 'loading'
              : error
                ? 'error'
                : data?.response_time_ms !== undefined
                  ? `${data.response_time_ms}ms`
                  : 'unknown'
          }
          error={error ? (error as Error).message : undefined}
        />
      </SimpleGrid>
    </Container>
  );
}
