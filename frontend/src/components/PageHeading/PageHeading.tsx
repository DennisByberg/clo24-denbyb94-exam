import { Title, Text, Stack, Group, Flex, TitleProps } from '@mantine/core';

interface PageHeadingProps {
  title: string;
  description?: string;
  order: 1 | 2 | 3 | 4 | 5 | 6;
  titleProps?: Omit<TitleProps, 'order'>;
}

export function PageHeading({ title, description, order = 1, titleProps }: PageHeadingProps) {
  const hashtags = '#'.repeat(order);

  return (
    <Stack gap={'xs'}>
      <Group gap={2}>
        <Flex display={'flex'} align={'start'}>
          <Title fw={700} fs={'italic'} order={order} {...titleProps}>
            <Text component={'span'} c={'red'} inherit>
              {hashtags}
            </Text>{' '}
            {title}
          </Title>
        </Flex>
      </Group>
      {description && (
        <Text fs={'italic'} c={'dimmed'}>
          {description}
        </Text>
      )}
    </Stack>
  );
}
