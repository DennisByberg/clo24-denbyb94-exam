import { Paper, Group, Text, Code, Loader } from '@mantine/core';
import { IconHeartbeat, IconServer } from '@tabler/icons-react';
import { isHealthyStatus } from '@/lib/utils/healthStatus';

interface HealthCardProps {
  title: string;
  status: string;
  error?: string;
  icon?: React.ReactNode;
}

/**
 * Card component displaying health status with visual indicators
 * @param title - Card title
 * @param status - Health status string
 * @param error - Optional error message
 * @param icon - Optional custom icon
 */
export default function HealthCard({ title, status, error, icon }: HealthCardProps) {
  const isLoading = status === 'loading';
  const isError = status === 'error' || status === 'unknown';
  const isHealthy = isHealthyStatus(status);

  return (
    <Paper withBorder p="md" radius="md">
      <Group justify="space-between">
        <Group gap="xs">
          {icon || <IconServer size={20} color="var(--mantine-color-dimmed)" />}
          <Text size="sm" c="dimmed" fw={700} tt="uppercase">
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

      {isLoading ? (
        <Code fz={'lg'} c="var(--mantine-color-dimmed)" block mt={25}>
          <Group gap="xs">
            <Loader size="xs" type="oval" color="teal" />
            <Text span inherit>
              Connecting
            </Text>
          </Group>
        </Code>
      ) : isError ? (
        <Code fz="lg" c="var(--mantine-color-red-6)" block mt={25}>
          {error || 'Failed to fetch'}
        </Code>
      ) : (
        <Code
          fz="lg"
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
