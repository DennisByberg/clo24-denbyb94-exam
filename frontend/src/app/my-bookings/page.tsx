'use client';

import { Stack, Loader, Text, SimpleGrid, Paper } from '@mantine/core';
import { IconCalendar, IconUsers, IconClock } from '@tabler/icons-react';
import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/api/client';
import { BookingResponse } from '@/types/booking';
import { PageHeading } from '@/components/PageHeading/PageHeading';
import { InfoCard } from '@/components/InfoCard/InfoCard';
import { formatDate, formatTime } from '@/lib/utils/dateFormatter';

export default function MyBookingsPage() {
  // Queries
  const { data: upcomingBookings, isLoading: upcomingLoading } = useQuery<BookingResponse[]>({
    queryKey: ['bookings', 'upcoming'],
    queryFn: async () => {
      const response = await apiClient('/api/bookings/me?booking_filter=upcoming');
      return response as BookingResponse[];
    },
  });

  const { data: pastBookings, isLoading: pastLoading } = useQuery<BookingResponse[]>({
    queryKey: ['bookings', 'past'],
    queryFn: async () => {
      const response = await apiClient('/api/bookings/me?booking_filter=past');
      return response as BookingResponse[];
    },
  });

  return (
    <Stack gap={'xl'}>
      <PageHeading
        order={1}
        title={'Your Royal Reservations'}
        description={`View and manage all your bookings across our exclusive venues. 
        Track upcoming reservations and review your dining history.`}
      />
      {/* UPCOMING BOOKINGS */}
      <Stack>
        <PageHeading order={2} title={'Upcoming Bookings'} />
        {upcomingLoading ? (
          <Loader size={'sm'} color={'dark.0'} />
        ) : upcomingBookings && upcomingBookings.length > 0 ? (
          <SimpleGrid cols={{ base: 1, sm: 2 }} spacing={'xl'}>
            {upcomingBookings.map((booking) => (
              <InfoCard
                key={booking.id}
                title={booking.restaurant_name}
                badge={{ label: 'Upcoming', color: 'green' }}
                details={[
                  {
                    icon: <IconCalendar size={16} color="var(--mantine-color-red-6)" />,
                    label: formatDate(booking.arrival_date),
                  },
                  {
                    icon: <IconClock size={16} color="var(--mantine-color-red-6)" />,
                    label: `${formatTime(booking.arrival_date)} - ${formatTime(booking.departure_date)}`,
                  },
                  {
                    icon: <IconUsers size={16} color="var(--mantine-color-red-6)" />,
                    label: `${booking.guest_count} guests`,
                  },
                ]}
              />
            ))}
          </SimpleGrid>
        ) : (
          <Paper p={'xl'} withBorder>
            <Text ta={'center'} c={'dimmed'}>
              No upcoming bookings
            </Text>
          </Paper>
        )}
      </Stack>

      {/* PAST BOOKINGS */}
      <Stack gap={'md'}>
        <PageHeading order={2} title={'Past Bookings'} />
        {pastLoading ? (
          <Loader size={'sm'} color={'dark.0'} />
        ) : pastBookings && pastBookings.length > 0 ? (
          <SimpleGrid cols={{ base: 1, sm: 2 }} spacing={'xl'}>
            {pastBookings.map((booking) => (
              <InfoCard
                key={booking.id}
                title={booking.restaurant_name}
                badge={{ label: 'Past', color: 'gray' }}
                details={[
                  {
                    icon: <IconCalendar size={16} color="var(--mantine-color-red-6)" />,
                    label: formatDate(booking.arrival_date),
                  },
                  {
                    icon: <IconClock size={16} color="var(--mantine-color-red-6)" />,
                    label: `${formatTime(booking.arrival_date)} - ${formatTime(booking.departure_date)}`,
                  },
                  {
                    icon: <IconUsers size={16} color="var(--mantine-color-red-6)" />,
                    label: `${booking.guest_count} guests`,
                  },
                ]}
                opacity={0.7}
              />
            ))}
          </SimpleGrid>
        ) : (
          <Paper p={'xl'} withBorder>
            <Text ta={'center'} c={'dimmed'}>
              No past bookings
            </Text>
          </Paper>
        )}
      </Stack>
    </Stack>
  );
}
