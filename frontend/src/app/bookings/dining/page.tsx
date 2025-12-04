'use client';

import { SimpleGrid, Stack, Loader } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import RestaurantCard from '@/components/RestaurantCard/RestaurantCard';
import { apiClient } from '@/lib/api/client';
import { Restaurant } from '@/types/restaurant';
import { PageHeading } from '../../../components/PageHeading/PageHeading';

export default function DiningPage() {
  const { data: restaurants, isLoading } = useQuery<Restaurant[]>({
    queryKey: ['restaurants'],
    queryFn: () => apiClient('/api/restaurants'),
  });

  return (
    <>
      <PageHeading
        order={1}
        title={'Fine Dining Experiences'}
        description={`Discover our collection of world-class restaurants. 
        From intimate dining to grand celebrations, each venue offers 
        a unique culinary journey crafted by award-winning chefs.`}
      />

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
