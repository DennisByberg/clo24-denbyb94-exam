'use client';

import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Button, Container, Paper, PasswordInput, Stack, Text, TextInput, Title } from '@mantine/core';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const result = await signIn('credentials', {
      email,
      password,
      redirect: false,
    });

    setLoading(false);

    if (result?.error) {
      setError('Invalid email or password');
    } else {
      router.push('/');
      router.refresh();
    }
  };

  return (
    <Container size={420} my={40}>
      <Title ta="center" fw={700}>
        Welcome to <Text component="span" c="red" inherit>ACE GROUP</Text>
      </Title>
      <Text c="dimmed" size="sm" ta="center" mt={5}>
        Sign in to manage your bookings
      </Text>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <form onSubmit={handleSubmit}>
          <Stack>
            <TextInput
              label="Email"
              placeholder="test@example.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <PasswordInput
              label="Password"
              placeholder="Your password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {error && (
              <Text c="red" size="sm">
                {error}
              </Text>
            )}
            <Button type="submit" fullWidth loading={loading}>
              Sign in
            </Button>
          </Stack>
        </form>

        <Paper p="md" mt="xl" bg="dark.6" radius="md">
          <Text size="xs" fw={600} mb="xs">Test Accounts:</Text>
          <Text size="xs" c="dimmed">
            • test@example.com / password123
          </Text>
          <Text size="xs" c="dimmed">
            • admin@example.com / admin123
          </Text>
        </Paper>
      </Paper>
    </Container>
  );
}
