'use client';

import {
  Container,
  Title,
  SimpleGrid,
  Stack,
  Loader,
  Box,
  Text,
  BackgroundImage,
} from '@mantine/core';
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
      <Container size="xl">
        <BackgroundImage src={`${AZURE_RESTAURANT_BLOB_URL}/restaurant-hero.jpeg`}>
          <Box
            p="200px var(--mantine-spacing-md)"
            ta="center"
            display="flex"
            style={{
              backgroundColor: 'rgba(0, 0, 0, 0.75)',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Title order={1} size="3rem" c="white" mb="1rem">
              Dining & Drinking
            </Title>
            <Text size="xl" c="white" maw="600px">
              Discover our exceptional restaurants and reserve your table for an unforgettable
              culinary experience
            </Text>
          </Box>
        </BackgroundImage>
      </Container>

      <Container size="xl" py="xl">
        <Stack gap="xl">
          {isLoading && <Loader size="lg" display="block" m="0 auto" />}

          {restaurants && restaurants.length > 0 && (
            <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="lg">
              {restaurants.map((restaurant) => (
                <RestaurantCard key={restaurant.id} restaurant={restaurant} />
              ))}
            </SimpleGrid>
          )}
        </Stack>
      </Container>
    </>
  );
}
