import { Avatar, Text, Paper, Group, Stack, Anchor } from '@mantine/core';

interface TeamMemberProps {
  avatarSrc: string;
  name: string;
  role: string;
  githubUrl: string;
}

export function TeamMember({ avatarSrc, name, role, githubUrl }: TeamMemberProps) {
  const githubUsername = githubUrl.replace('https://github.com/', '');

  return (
    <Paper p={'xl'} withBorder>
      <Group justify={'center'}>
        <Stack align={'center'} gap={'md'}>
          <Avatar size={120} radius={120} src={avatarSrc} alt={name} />
          <Stack align={'center'} gap={4}>
            <Text size={'lg'} fw={600}>
              {name}
            </Text>
            <Text size={'sm'} c={'dimmed'}>
              {role}
            </Text>
            <Group gap={4}>
              <Anchor href={githubUrl} target={'_blank'} rel={'noopener noreferrer'} size={'sm'}>
                github.com/{githubUsername}
              </Anchor>
            </Group>
          </Stack>
        </Stack>
      </Group>
    </Paper>
  );
}
