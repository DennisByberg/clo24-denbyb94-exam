'use client';

import { Box, Group, Text } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import packageJson from '../../../package.json';

interface BackendVersion {
  version: string;
}

async function fetchBackendVersion(): Promise<string> {
  try {
    const backendUrl =
      process.env.NEXT_PUBLIC_API_URL || 'https://app-ace-group-backend.azurewebsites.net';
    const response = await fetch(`${backendUrl}/api/version`);

    if (!response.ok) {
      return 'unknown';
    }

    const data: BackendVersion = await response.json();
    return data.version;
  } catch {
    return 'unknown';
  }
}

export default function Footer() {
  const { data: backendVersion = 'loading...' } = useQuery({
    queryKey: ['backendVersion'],
    queryFn: fetchBackendVersion,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: false,
  });

  const frontendVersion = packageJson.version;

  return (
    <Box
      component="footer"
      style={{
        borderTop: '1px solid var(--mantine-color-dark-4)',
        marginTop: 'auto',
        padding: '1rem',
      }}
    >
      <Group justify="center" gap="xl">
        <Text size="sm" c="dimmed">
          Frontend: v{frontendVersion}
        </Text>
        <Text size="sm" c="dimmed">
          Backend: v{backendVersion}
        </Text>
      </Group>
    </Box>
  );
}
