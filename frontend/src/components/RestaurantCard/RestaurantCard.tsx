'use client';

import { Card, Text, Button, Image, Stack, Box } from '@mantine/core';
import { IconBook } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';
import { Restaurant } from '@/types/restaurant';

interface RestaurantCardProps {
  restaurant: Restaurant;
}

/**
 * RestaurantCard component displays a restaurant with image, name, description and booking button
 * @param restaurant - Restaurant object to display
 * @returns Card component with restaurant information
 */
export default function RestaurantCard({ restaurant }: RestaurantCardProps) {
  const router = useRouter();

  return (
    <Card padding={40} bg={'var(--mantine-color-dark-8)'}>
      {/* Restaurant Image */}
      <Box pos={'relative'}>
        <Image src={restaurant.image_url || undefined} alt={restaurant.name} h={300} />

        {/* Restaurant Name */}
        <Box>
          <Text size={'2rem'} mb={'lg'} mt={'lg'} fw={500} c={'var(--mantine-color-yellow-2)'}>
            {restaurant.name}
          </Text>
        </Box>
      </Box>

      {/* Description */}
      <Box>
        <Text size={'sm'} c={'var(--mantine-color-dimmed)'} mb={'2rem'}>
          Experience fine dining at its best with exceptional cuisine and atmosphere
        </Text>
      </Box>

      {/* Buttons */}
      <Stack gap={'md'}>
        <Button
          size={'md'}
          color={'teal'}
          lts={'1px'}
          leftSection={<IconBook size={18} />}
          onClick={() => router.push(`/bookings/dining/${restaurant.id}`)}
        >
          BOOK TABLE
        </Button>
      </Stack>
    </Card>
  );
}
