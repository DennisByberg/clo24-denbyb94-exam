'use client';

import { useState } from 'react';
import { Stack, Loader, Text, SimpleGrid, Paper } from '@mantine/core';
import { IconInfoCircle, IconBook } from '@tabler/icons-react';
import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/api/client';
import { Restaurant } from '@/types/restaurant';
import { PageHeading } from '@/components/PageHeading/PageHeading';
import { InfoCard } from '@/components/InfoCard/InfoCard';
import BookingModal from '@/components/BookingModal/BookingModal';

export default function DiningPage() {
  // State
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);
  const [bookingModalOpened, setBookingModalOpened] = useState(false);

  // Queries
  const { data: restaurants, isLoading } = useQuery<Restaurant[]>({
    queryKey: ['restaurants'],
    queryFn: () => apiClient('/api/restaurants'),
  });

  // Handlers
  const handleBookTable = (restaurant: Restaurant) => {
    setSelectedRestaurant(restaurant);
    setBookingModalOpened(true);
  };

  return (
    <Stack gap={'xl'}>
      <PageHeading
        order={1}
        title={'Fine Dining Experiences'}
        description={`Discover our collection of world-class restaurants. 
        From intimate dining to grand celebrations, each venue offers 
        a unique culinary journey crafted by award-winning chefs.`}
      />

      {/* ====================================================================== */}
      {/* RESTAURANTS */}
      {/* ====================================================================== */}
      <Stack>
        <PageHeading order={2} title={'Our Restaurants'} />
        {isLoading ? (
          <Loader size={'sm'} color={'dark.0'} />
        ) : restaurants && restaurants.length > 0 ? (
          <SimpleGrid cols={{ base: 1, sm: 2 }} spacing={'xl'}>
            {restaurants.map((restaurant) => (
              <InfoCard
                key={restaurant.id}
                title={restaurant.name}
                enableHover={false}
                imageUrl={restaurant.image_url}
                imageAlt={restaurant.name}
                details={[
                  {
                    icon: <IconInfoCircle size={16} color="var(--mantine-color-red-6)" />,
                    label: 'Description for the restaurant here coming soon...',
                  },
                ]}
                button={{
                  label: 'Book Table',
                  icon: <IconBook size={18} />,
                  onClick: () => handleBookTable(restaurant),
                  color: 'red',
                  variant: 'filled',
                }}
              />
            ))}
          </SimpleGrid>
        ) : (
          <Paper p={'xl'} withBorder>
            <Text ta={'center'} c={'dimmed'}>
              No restaurants available
            </Text>
          </Paper>
        )}
      </Stack>

      {/* Booking Modal */}
      {selectedRestaurant && (
        <BookingModal
          restaurantId={selectedRestaurant.id}
          opened={bookingModalOpened}
          onClose={() => setBookingModalOpened(false)}
          restaurantName={selectedRestaurant.name}
          restaurantImage={selectedRestaurant.image_url || undefined}
        />
      )}
    </Stack>
  );
}
