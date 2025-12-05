import { Paper, Group, Text, Code, Loader } from '@mantine/core';
import { IconHeartbeat, IconServer } from '@tabler/icons-react';
import { isHealthyStatus } from '@/lib/utils/healthStatus';

interface HealthCardProps {
  title: string;
  data?: string | number;
  isLoading: boolean;
  error?: Error | null;
  icon?: React.ReactNode;
}

export default function HealthCard({ title, data, isLoading, error, icon }: HealthCardProps) {
  const status = data?.toString() || 'unknown';
  const isHealthy = isHealthyStatus(status);

  return (
    <Paper p={'md'} bg={'var(--mantine-color-dark-8)'}>
      {/* Header */}
      <Group justify={'space-between'}>
        <Group>
          {icon || <IconServer size={20} color={'var(--mantine-color-dimmed)'} />}
          <Text size={'sm'} c={'dimmed'} fw={700} tt={'uppercase'}>
            {title}
          </Text>
        </Group>
        <IconHeartbeat
          color={
            isLoading
              ? 'var(--mantine-color-dimmed)'
              : isHealthy
                ? 'var(--mantine-color-teal-5)'
                : 'var(--mantine-color-red-6)'
          }
        />
      </Group>

      {/* Status Display */}
      {isLoading ? (
        <Code fz={'lg'} c={'var(--mantine-color-dimmed)'} block mt={25}>
          <Group gap={'xs'}>
            <Loader size={'xs'} type={'oval'} color={'teal'} />
            <Text span inherit>
              Connecting
            </Text>
          </Group>
        </Code>
      ) : error ? (
        <Code fz={'lg'} c={'var(--mantine-color-red-6)'} block mt={25}>
          {error.message || 'Failed to fetch'}
        </Code>
      ) : (
        <Code
          fz={'lg'}
          c={isHealthy ? 'var(--mantine-color-teal-5)' : 'var(--mantine-color-red-6)'}
          block
          mt={25}
        >
          {status}
        </Code>
      )}
    </Paper>
  );
}
