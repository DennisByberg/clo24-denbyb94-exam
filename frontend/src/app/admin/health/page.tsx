'use client';

import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/api/client';
import { Stack, SimpleGrid } from '@mantine/core';
import {
  IconServer,
  IconDatabase,
  IconShieldLock,
  IconUsers,
  IconClock,
} from '@tabler/icons-react';
import { PageHeading } from '@/components/PageHeading/PageHeading';
import { InfoCard } from '@/components/InfoCard/InfoCard';

export default function HealthPage() {
  // Queries
  const { data, error, isLoading } = useQuery({
    queryKey: ['health'],
    queryFn: () => apiClient('/health'),
  });

  const healthChecks = [
    {
      title: 'API Status',
      icon: <IconServer size={16} color="var(--mantine-color-red-6)" />,
      data: data?.api_status,
    },
    {
      title: 'Database',
      icon: <IconDatabase size={16} color="var(--mantine-color-red-6)" />,
      data: data?.database_status,
    },
    {
      title: 'Authentication',
      icon: <IconShieldLock size={16} color="var(--mantine-color-red-6)" />,
      data: data?.auth_mode ? `${data.auth_mode} mode` : undefined,
    },
    {
      title: 'Users',
      icon: <IconUsers size={16} color="var(--mantine-color-red-6)" />,
      data:
        data?.user_count !== undefined
          ? `${data.user_count} ${data.user_count === 1 ? 'user' : 'users'}`
          : undefined,
    },
    {
      title: 'Response Time',
      icon: <IconClock size={16} color="var(--mantine-color-red-6)" />,
      data: data?.response_time_ms !== undefined ? `${data.response_time_ms}ms` : undefined,
    },
  ];

  return (
    <Stack gap={'xl'}>
      <PageHeading
        order={1}
        title={'System Health Monitoring'}
        description={
          'Monitor the health and status of all system components in real-time. Track API performance, database connectivity, and authentication services.'
        }
      />

      {/* HEALTH CHECKS */}
      <Stack>
        <PageHeading order={2} title={'Health Status'} />
        <SimpleGrid cols={{ base: 1, sm: 2 }} spacing={'xl'}>
          {healthChecks.map((check) => (
            <InfoCard
              key={check.title}
              title={check.title}
              details={[
                {
                  icon: check.icon,
                  label: check.data || 'No data available',
                },
              ]}
              isLoading={isLoading}
              error={error}
            />
          ))}
        </SimpleGrid>
      </Stack>
    </Stack>
  );
}
