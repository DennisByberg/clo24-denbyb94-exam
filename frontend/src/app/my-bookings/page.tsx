'use client';

import { Title, Stack, Paper, Group, Badge, Loader, Text, SimpleGrid } from '@mantine/core';
import {
  IconCalendar,
  IconUsers,
  IconClock,
  IconCalendarEvent,
  IconHistory,
} from '@tabler/icons-react';
import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/api/client';
import { BookingResponse } from '@/types/booking';

export default function MyBookingsPage() {
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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <Stack gap={'xl'}>
      {/* Upcoming Bookings */}
      <Stack>
        <Group gap={'xs'}>
          <IconCalendarEvent size={24} />
          <Title order={2} size={'h3'}>
            Upcoming Bookings
          </Title>
        </Group>
        {upcomingLoading ? (
          <Loader size={'sm'} color={'yellow.2'} />
        ) : upcomingBookings && upcomingBookings.length > 0 ? (
          <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing={'xl'}>
            {upcomingBookings.map((booking) => (
              <Paper key={booking.id} p={'md'} withBorder>
                <Group gap={'xs'} mb={'xs'}>
                  <Title order={3} size={'h4'}>
                    {booking.restaurant_name}
                  </Title>
                  <Badge color={'green'} variant={'light'}>
                    Upcoming
                  </Badge>
                </Group>
                <Stack gap={'xs'}>
                  <Group gap={'xs'}>
                    <IconCalendar size={16} />
                    <Text size={'sm'}>{formatDate(booking.arrival_date)}</Text>
                  </Group>
                  <Group gap={'xs'}>
                    <IconClock size={16} />
                    <Text size={'sm'}>
                      {formatTime(booking.arrival_date)} - {formatTime(booking.departure_date)}
                    </Text>
                  </Group>
                  <Group gap={'xs'}>
                    <IconUsers size={16} />
                    <Text size={'sm'}>{booking.guest_count} guests</Text>
                  </Group>
                </Stack>
              </Paper>
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

      {/* Past Bookings */}
      <Stack gap={'md'}>
        <Group gap={'xs'}>
          <IconHistory size={24} />
          <Title order={2} size={'h3'}>
            Past Bookings
          </Title>
        </Group>
        {pastLoading ? (
          <Loader size={'sm'} color="yellow.2" />
        ) : pastBookings && pastBookings.length > 0 ? (
          <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing={'xl'}>
            {pastBookings.map((booking) => (
              <Paper key={booking.id} p={'md'} withBorder opacity={0.7}>
                <Group gap={'xs'} mb={'xs'}>
                  <Title order={3} size={'h4'}>
                    {booking.restaurant_name}
                  </Title>
                  <Badge color={'gray'} variant={'light'}>
                    Past
                  </Badge>
                </Group>
                <Stack gap={'xs'}>
                  <Group gap={'xs'}>
                    <IconCalendar size={16} />
                    <Text size={'sm'}>{formatDate(booking.arrival_date)}</Text>
                  </Group>
                  <Group gap={'xs'}>
                    <IconClock size={16} />
                    <Text size={'sm'}>
                      {formatTime(booking.arrival_date)} - {formatTime(booking.departure_date)}
                    </Text>
                  </Group>
                  <Group gap={'xs'}>
                    <IconUsers size={16} />
                    <Text size={'sm'}>{booking.guest_count} guests</Text>
                  </Group>
                </Stack>
              </Paper>
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
