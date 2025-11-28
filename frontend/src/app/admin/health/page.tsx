'use client';

import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/api/client';
import { Title, SimpleGrid } from '@mantine/core';
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

  const healthChecks = [
    {
      title: 'API Status',
      icon: <IconServer size={20} color="var(--mantine-color-dimmed)" />,
      data: data?.api_status,
    },
    {
      title: 'Database',
      icon: <IconDatabase size={20} color="var(--mantine-color-dimmed)" />,
      data: data?.database_status,
    },
    {
      title: 'Authentication',
      icon: <IconShieldLock size={20} color="var(--mantine-color-dimmed)" />,
      data: data?.auth_mode ? `${data.auth_mode} mode` : undefined,
    },
    {
      title: 'Users',
      icon: <IconUsers size={20} color="var(--mantine-color-dimmed)" />,
      data: data?.user_count !== undefined ? `${data.user_count} users` : undefined,
    },
    {
      title: 'Response Time',
      icon: <IconClock size={20} color="var(--mantine-color-dimmed)" />,
      data: data?.response_time_ms !== undefined ? `${data.response_time_ms}ms` : undefined,
    },
  ];

  return (
    <>
      <Title order={1} mb={'xl'}>
        Health Checks
      </Title>
      <SimpleGrid cols={{ base: 1, sm: 2 }} spacing={'md'}>
        {healthChecks.map((check) => (
          <HealthCard
            key={check.title}
            title={check.title}
            icon={check.icon}
            data={check.data}
            isLoading={isLoading}
            error={error as Error}
          />
        ))}
      </SimpleGrid>
    </>
  );
}
