'use client';

import { signIn } from 'next-auth/react';
import { Button, Container, Paper, Stack, Text, Title } from '@mantine/core';
import { IconBrandGoogle } from '@tabler/icons-react';

export default function LoginPage() {
  return (
    <Container size={420} my={40}>
      <Title ta={'center'} fw={700}>
        <Text component={'span'} inherit>
          ACE
        </Text>{' '}
        <Text component={'span'} c={'red'} inherit>
          GROUP
        </Text>
      </Title>
      <Text c={'dimmed'} size={'sm'} ta={'center'} mt={5}>
        Sign in to manage your bookings
      </Text>

      <Paper withBorder shadow={'md'} p={30} mt={30} radius={'md'}>
        <Stack>
          <Button
            fullWidth
            leftSection={<IconBrandGoogle size={18} />}
            variant={'default'}
            size={'lg'}
            onClick={() => signIn('google', { callbackUrl: '/' })}
          >
            Sign in with Google
          </Button>
        </Stack>
      </Paper>
    </Container>
  );
}
