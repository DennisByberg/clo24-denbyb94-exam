import { Paper, Group, Text, Code, Loader } from '@mantine/core';
import { IconHeartbeat, IconCheck, IconX, IconServer } from '@tabler/icons-react';

interface HealthCardProps {
  status: string;
  error?: string;
}

export default function HealthCard({ status, error }: HealthCardProps) {
  const isHealthy = status === 'healthy';
  const isLoading = status === 'loading';
  const isError = status === 'error';

  return (
    <Paper withBorder p="md" radius="md">
      <Group justify="space-between">
        <Group gap="xs">
          <IconServer size={20} color="var(--mantine-color-dimmed)" />
          <Text size="sm" c="dimmed" fw={700} tt="uppercase">
            Backend Health
          </Text>
        </Group>
        {isLoading ? (
          <IconHeartbeat color="var(--mantine-color-dimmed)" />
        ) : (
          <IconHeartbeat
            color={isHealthy ? 'var(--mantine-color-teal-5)' : 'var(--mantine-color-red-6)'}
          />
        )}
      </Group>

      {isLoading ? (
        <Code fz={'lg'} c="var(--mantine-color-dimmed)" block mt={25}>
          <Group gap="xs">
            <Loader size="xs" type="oval" />
            <Text span inherit>
              Connecting
            </Text>
          </Group>
        </Code>
      ) : isError ? (
        <Code fz="lg" c="var(--mantine-color-red-6)" block mt={25}>
          <Group gap="xs">
            <IconX size={16} />
            <Text span inherit>
              {error || 'Failed to fetch'}
            </Text>
          </Group>
        </Code>
      ) : (
        <Code
          fz="lg"
          c={isHealthy ? 'var(--mantine-color-teal-5)' : 'var(--mantine-color-red-6)'}
          block
          mt={25}
        >
          <Group gap="xs">
            {isHealthy ? <IconCheck size={16} /> : <IconX size={16} />}
            <Text span inherit>
              {status}
            </Text>
          </Group>
        </Code>
      )}
    </Paper>
  );
}
