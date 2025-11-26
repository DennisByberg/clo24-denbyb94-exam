'use client';

import { Card, Text, Button, Image, Stack, Box } from '@mantine/core';
import { IconBook, IconInfoCircle } from '@tabler/icons-react';
import { Restaurant } from '@/types/restaurant';

interface RestaurantCardProps {
  restaurant: Restaurant;
}

export default function RestaurantCard({ restaurant }: RestaurantCardProps) {
  const [prefix, type] = restaurant.name.split(' ');

  return (
    <Card shadow="sm" padding="lg" radius="md" display="flex">
      {/* Restaurant Image */}
      <Box
        style={{
          position: 'relative',
          borderRadius: 'var(--mantine-radius-md)',
          overflow: 'hidden',
          marginBottom: '1rem',
        }}
      >
        <Image src={restaurant.image_url || undefined} alt={restaurant.name} h={300} fit="cover" />
        <Box
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            textAlign: 'center',
            width: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
            padding: 'var(--mantine-spacing-md)',
          }}
        >
          <Text size="22px" fw={400} c="white" lts="2px">
            {prefix}
          </Text>
          <Text size="3rem" fw={500} c="white">
            {type}
          </Text>
        </Box>
      </Box>

      {/* Description */}
      <Box flex={1}>
        <Text size="sm" c="dimmed" mb={30}>
          Experience fine dining at its best with exceptional cuisine and atmosphere
        </Text>
      </Box>

      {/* Buttons */}
      <Stack gap="md">
        <Button size="md" color="teal" fw={600} lts="1px" leftSection={<IconBook size={18} />}>
          BOOK
        </Button>
        <Button
          size="md"
          variant="outline"
          color="teal"
          fw={600}
          lts="1px"
          leftSection={<IconInfoCircle size={18} />}
        >
          READ MORE
        </Button>
      </Stack>
    </Card>
  );
}
