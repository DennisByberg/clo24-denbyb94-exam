import { ReactNode } from 'react';
import {
  Paper,
  Group,
  Badge,
  Stack,
  Text,
  Image,
  Button,
  ButtonProps,
  Loader,
} from '@mantine/core';
import { PageHeading } from '@/components/PageHeading/PageHeading';
import classes from './InfoCard.module.css';

export interface InfoCardDetail {
  icon: ReactNode;
  label: string;
}

export interface InfoCardProps {
  title: string;
  badge?: {
    label: string;
    color: string;
  };
  imageUrl?: string | null;
  imageAlt?: string;
  details: InfoCardDetail[];
  button?: {
    label: string;
    icon?: ReactNode;
    onClick: () => void;
  } & Pick<ButtonProps, 'color' | 'variant'>;
  opacity?: number;
  enableHover?: boolean;
  isLoading?: boolean;
  error?: Error | null;
}

export function InfoCard({
  title,
  badge,
  imageUrl,
  imageAlt,
  details,
  button,
  opacity = 1,
  enableHover = true,
  isLoading = false,
  error,
}: InfoCardProps) {
  return (
    <Paper p={'md'} withBorder opacity={opacity} className={enableHover ? classes.card : undefined}>
      {/* Image */}
      {imageUrl && <Image src={imageUrl} alt={imageAlt || title} h={200} mb={'md'} radius={'sm'} />}

      {/* Header */}
      <Group
        justify={'space-between'}
        align={'center'}
        mb={'sm'}
        pb={'sm'}
        style={{ borderBottom: '1px solid var(--mantine-color-dark-4)' }}
      >
        <PageHeading order={3} title={title} />
        {badge && (
          <Badge color={badge.color} variant={'light'}>
            {badge.label}
          </Badge>
        )}
      </Group>

      {/* Details */}
      <Stack gap={'xs'} mb={button ? 'md' : undefined}>
        {isLoading ? (
          <Group gap={'xs'}>
            <Loader size={'xs'} type={'oval'} color={'teal'} />
            <Text size={'sm'} c={'dimmed'}>
              Loading...
            </Text>
          </Group>
        ) : error ? (
          <Text size={'sm'} c={'red'}>
            {error.message || 'Failed to load'}
          </Text>
        ) : (
          details.map((detail, index) => (
            <Group key={index} gap={'xs'}>
              {detail.icon}
              <Text size={'sm'}>{detail.label}</Text>
            </Group>
          ))
        )}
      </Stack>

      {/* Action Button */}
      {button && (
        <Button
          fullWidth
          variant={button.variant || 'filled'}
          color={button.color || 'red'}
          leftSection={button.icon}
          onClick={button.onClick}
        >
          {button.label}
        </Button>
      )}
    </Paper>
  );
}
