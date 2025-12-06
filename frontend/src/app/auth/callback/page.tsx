'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Center, Container, Loader, Paper, Stack, Text } from '@mantine/core';
import { IconCheck } from '@tabler/icons-react';

export default function AuthCallbackPage() {
  const router = useRouter();

  useEffect(() => {
    // Vänta kort tid innan redirect för att visa meddelande
    const timer = setTimeout(() => {
      router.push('/');
    }, 2000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <Container size={'xs'} py={100}>
      <Paper p={'xl'} radius={'md'} withBorder>
        <Stack align={'center'} gap={'lg'}>
          <IconCheck size={64} color={'var(--mantine-color-green-6)'} />
          <div>
            <Text size={'xl'} fw={600} ta={'center'}>
              Successfully Logged In
            </Text>
            <Text size={'sm'} c={'dimmed'} ta={'center'} mt={'xs'}>
              Redirecting you to the home page...
            </Text>
          </div>
          <Loader size={'sm'} />
        </Stack>
      </Paper>
    </Container>
  );
}
