'use client';

import { Title, SimpleGrid, Stack, Loader, Box, Text, BackgroundImage } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import RestaurantCard from '@/components/RestaurantCard/RestaurantCard';
import { apiClient } from '@/lib/api/client';
import { Restaurant } from '@/types/restaurant';

const AZURE_RESTAURANT_BLOB_URL = process.env.NEXT_PUBLIC_AZURE_BLOB_URL;

export default function DiningPage() {
  const { data: restaurants, isLoading } = useQuery<Restaurant[]>({
    queryKey: ['restaurants'],
    queryFn: () => apiClient('/api/restaurants'),
  });

  return (
    <>
      {/* Hero Section */}
      <BackgroundImage src={`${AZURE_RESTAURANT_BLOB_URL}/restaurant-hero.jpeg`}>
        <Box
          p={'200px var(--mantine-spacing-md)'}
          ta={'center'}
          display={'flex'}
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Title order={1} size={'3rem'} c={'white'} mb={'1rem'}>
            Dining & Drinking
          </Title>
          <Text size={'xl'} c={'white'} maw={'30rem'}>
            Discover our exceptional restaurants and reserve your table for an unforgettable
            culinary experience
          </Text>
        </Box>
      </BackgroundImage>

      {/* Restaurant List */}
      <Stack mt={'xl'}>
        {isLoading && <Loader color={'var(--mantine-color-yellow-2)'} size={'lg'} m={'0 auto'} />}

        {restaurants && restaurants.length > 0 && (
          <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing={'xl'}>
            {restaurants.map((restaurant) => (
              <RestaurantCard key={restaurant.id} restaurant={restaurant} />
            ))}
          </SimpleGrid>
        )}
      </Stack>
    </>
  );
}
