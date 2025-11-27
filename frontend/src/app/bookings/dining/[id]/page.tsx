'use client';

import { Container, Title, Stack, Paper, Text, Button } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import { apiClient } from '@/lib/api/client';
import { RestaurantDetail } from '@/types/restaurant';

export default function RestaurantBookingPage() {
  const params = useParams();
  const restaurantId = params.id as string;
  const [numberOfGuests, setNumberOfGuests] = useState<number>(2);

  const { data: restaurant, isLoading } = useQuery<RestaurantDetail>({
    queryKey: ['restaurant', restaurantId],
    queryFn: () => apiClient(`/api/restaurants/${restaurantId}`),
  });

  if (isLoading) {
    return (
      <Container size="lg" py="xl">
        <Text>Laddar...</Text>
      </Container>
    );
  }

  if (!restaurant) {
    return (
      <Container size="lg" py="xl">
        <Text>Restaurangen hittades inte</Text>
      </Container>
    );
  }

  return (
    <Container size="xl">
      <Stack>
        {/* Restaurant Header */}
        <Title bd={'1px solid red'} order={1}>
          {restaurant.name}
        </Title>

        {/* Booking Form */}
        <Paper>
          <Title order={3} mb={'lg'}>
            Välj gäster & tillfälle
          </Title>

          <Stack gap="xl">
            {/* Number of Guests */}
            <div>
              <Text fw={500} size="md" mb="md">
                Antal gäster
              </Text>
              <Button.Group>
                {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                  <Button
                    key={num}
                    variant={numberOfGuests === num ? 'filled' : 'default'}
                    onClick={() => setNumberOfGuests(num)}
                    color="teal"
                  >
                    {num}
                  </Button>
                ))}
              </Button.Group>
            </div>
          </Stack>
        </Paper>
      </Stack>
    </Container>
  );
}
