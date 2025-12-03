'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Modal, Stack, Text, Button, Group, Progress, Loader } from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import {
  IconUsers,
  IconCalendar,
  IconClock,
  IconFileText,
  IconArrowRight,
  IconArrowLeft,
  IconCheck,
} from '@tabler/icons-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient, ApiError } from '@/lib/api/client';
import { createBooking } from '@/lib/api/bookings';
import { formatTime, formatDate, formatDateForAPI } from '@/lib/utils/dateFormatter';
import { BookingSlot, BookingResponse } from '@/types/booking';

interface BookingModalProps {
  opened: boolean;
  onClose: () => void;
  restaurantName: string;
  restaurantImage?: string;
  restaurantId: number;
}

const GUEST_OPTIONS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

const getStepText = (step: number): string => {
  switch (step) {
    case 1:
      return 'Step 1: Select number of guests and date';
    case 2:
      return 'Step 2: Confirm your booking';
    case 3:
      return 'Step 3: Booking confirmed';
    default:
      return '';
  }
};

const getProgressValue = (step: number): number => {
  switch (step) {
    case 1:
      return 33;
    case 2:
      return 66;
    case 3:
      return 100;
    default:
      return 0;
  }
};

export default function BookingModal({
  opened,
  onClose,
  restaurantName,
  restaurantImage,
  restaurantId,
}: BookingModalProps) {
  const today = new Date();
  const [step, setStep] = useState<number>(1);
  const [numberOfGuests, setNumberOfGuests] = useState<number | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(today);
  const [selectedSlotId, setSelectedSlotId] = useState<number | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [bookingResult, setBookingResult] = useState<BookingResponse | null>(null);

  const queryClient = useQueryClient();

  const bookingMutation = useMutation({
    mutationFn: createBooking,
    onSuccess: (data) => {
      setBookingResult(data);
      setErrorMessage(null);
      queryClient.invalidateQueries({ queryKey: ['available-slots'] });
      setStep(3);
    },
    onError: (error: ApiError) => {
      if (error.status === 400) {
        setErrorMessage('Too many guests for this table. Please select fewer guests.');
      } else if (error.status === 404) {
        setErrorMessage('Time slot no longer available. Please select another time.');
      } else if (error.status === 409) {
        setErrorMessage('This time is already booked. Please select another time.');
      } else {
        setErrorMessage('An unexpected error occurred. Please try again later.');
      }
    },
  });

  const { data: availableSlots, isLoading } = useQuery<BookingSlot[]>({
    queryKey: ['available-slots', restaurantId, selectedDate, numberOfGuests],
    queryFn: () =>
      apiClient(
        `/api/restaurants/${restaurantId}/available-slots?date=${selectedDate ? formatDateForAPI(selectedDate) : ''}&guests=${numberOfGuests}`
      ),
    enabled: numberOfGuests !== null && selectedDate !== null,
  });

  const selectedSlot = availableSlots?.find((slot) => slot.id === selectedSlotId);
  const maxDate = new Date();
  maxDate.setDate(maxDate.getDate() + 30);

  const handleClose = () => {
    setStep(1);
    setNumberOfGuests(null);
    setSelectedDate(new Date());
    setSelectedSlotId(null);
    setErrorMessage(null);
    setBookingResult(null);
    onClose();
  };

  const handleGuestSelection = (num: number) => {
    setNumberOfGuests(numberOfGuests === num ? null : num);
    setSelectedSlotId(null);
  };

  const handleTimeSelection = (slotId: number) => {
    setSelectedSlotId(selectedSlotId === slotId ? null : slotId);
  };

  const handleDateChange = (value: Date | string | null) => {
    setSelectedDate(value ? new Date(value) : null);
    setSelectedSlotId(null);
  };

  const renderRestaurantImage = () => (
    <Image
      src={restaurantImage || ''}
      alt={restaurantName}
      width={500}
      height={200}
      // TODO: Use Next.js Image props instead of inline styles if possible
      style={{
        width: '100%',
        height: '200px',
        objectFit: 'cover',
        marginBottom: '1rem',
        pointerEvents: 'none',
      }}
    />
  );

  const renderSectionHeader = (title: string, icon: React.ReactNode) => (
    <Group gap={'xs'} bg={'dark.8'} p={'xs'}>
      {icon}
      <Text fw={500} size={'sm'} c={'yellow.2'}>
        {title}
      </Text>
    </Group>
  );

  const renderStep1 = () => (
    <>
      {renderRestaurantImage()}
      <Stack>
        {/* Number of Guests */}
        <Stack>
          {renderSectionHeader(
            'Number of Guests',
            <IconUsers size={18} color="var(--mantine-color-yellow-2)" />
          )}
          <Group gap={'xs'}>
            {GUEST_OPTIONS.map((num) => (
              <Button
                key={num}
                variant={numberOfGuests === num ? 'filled' : 'default'}
                onClick={() => handleGuestSelection(num)}
                color={'teal'}
              >
                {num}
              </Button>
            ))}
          </Group>
        </Stack>

        {/* Date Picker */}
        <Stack>
          {renderSectionHeader(
            'Select Date',
            <IconCalendar size={18} color="var(--mantine-color-yellow-2)" />
          )}
          <Group justify={'center'}>
            <DatePicker
              size={'md'}
              value={selectedDate}
              onChange={handleDateChange}
              minDate={today}
              maxDate={maxDate}
              c={'yellow.2'}
            />
          </Group>
        </Stack>

        {/* Available Times */}
        <Stack>
          {renderSectionHeader(
            'Select Time',
            <IconClock size={18} color="var(--mantine-color-yellow-2)" />
          )}
          {isLoading && <Loader />}
          {!numberOfGuests || !selectedDate ? (
            <Text c={'dimmed'}>Please select number of guests and date first</Text>
          ) : !isLoading && availableSlots && availableSlots.length > 0 ? (
            <Group>
              {availableSlots.map((slot) => (
                <Button
                  key={slot.id}
                  variant={selectedSlotId === slot.id ? 'filled' : 'default'}
                  onClick={() => handleTimeSelection(slot.id)}
                  color={'teal'}
                >
                  {formatTime(slot.arrival_date)}
                </Button>
              ))}
            </Group>
          ) : !isLoading && availableSlots && availableSlots.length === 0 ? (
            <Text size={'sm'} c={'dimmed'}>
              No available times for this date. Please try another date or fewer guests.
            </Text>
          ) : null}
        </Stack>

        {/* Continue Button */}
        <Button
          size={'md'}
          mt={20}
          color={'teal'}
          disabled={!selectedDate || !numberOfGuests || !selectedSlotId}
          onClick={() => setStep(2)}
          rightSection={<IconArrowRight size={18} />}
        >
          Continue
        </Button>
      </Stack>
    </>
  );

  const renderStep2 = () => (
    <>
      {renderRestaurantImage()}
      <Stack>
        {/* Booking Summary */}
        <Stack>
          {renderSectionHeader(
            'Booking Summary',
            <IconFileText size={18} color="var(--mantine-color-yellow-2)" />
          )}
          <Stack p={'sm'}>
            <Group justify={'space-between'}>
              <Text size={'sm'} c={'dimmed'}>
                Restaurant
              </Text>
              <Text size={'sm'} fw={500}>
                {restaurantName}
              </Text>
            </Group>
            <Group justify={'space-between'}>
              <Text size={'sm'} c={'dimmed'}>
                Number of Guests
              </Text>
              <Text size={'sm'} fw={500}>
                {numberOfGuests} {numberOfGuests === 1 ? 'person' : 'people'}
              </Text>
            </Group>
            <Group justify={'space-between'}>
              <Text size={'sm'} c={'dimmed'}>
                Date
              </Text>
              <Text size={'sm'} fw={500}>
                {selectedDate && formatDate(selectedDate)}
              </Text>
            </Group>
            <Group justify={'space-between'}>
              <Text size={'sm'} c={'dimmed'}>
                Time
              </Text>
              <Text size={'sm'} fw={500}>
                {selectedSlot && (
                  <>
                    {formatTime(selectedSlot.arrival_date)} -{' '}
                    {formatTime(selectedSlot.departure_date)}
                  </>
                )}
              </Text>
            </Group>
          </Stack>
        </Stack>

        {/* Action Buttons */}
        <Group grow mt={20}>
          <Button
            size={'md'}
            variant={'default'}
            onClick={() => setStep(1)}
            leftSection={<IconArrowLeft size={18} />}
            disabled={bookingMutation.isPending}
          >
            Back
          </Button>
          <Button
            size={'md'}
            color={'teal'}
            onClick={() => {
              if (selectedSlotId && numberOfGuests) {
                bookingMutation.mutate({
                  slot_id: selectedSlotId,
                  guest_count: numberOfGuests,
                });
              }
            }}
            rightSection={<IconCheck size={18} />}
            loading={bookingMutation.isPending}
          >
            Confirm Booking
          </Button>
        </Group>

        {/* Error Message */}
        {errorMessage && (
          <Text c={'red'} size={'sm'} mt={'md'} ta={'center'}>
            {errorMessage}
          </Text>
        )}
      </Stack>
    </>
  );

  const renderStep3 = () => (
    <>
      {renderRestaurantImage()}
      <Stack align={'center'} gap={'xl'}>
        {/* Success Icon */}
        <IconCheck size={80} color="var(--mantine-color-teal-6)" />

        {/* Success Message */}
        <Stack align={'center'} gap={'xs'}>
          <Text size={'xl'} fw={700} c={'teal'}>
            Booking Confirmed!
          </Text>
          <Text size={'sm'} c={'dimmed'}>
            Your booking has been registered
          </Text>
        </Stack>

        {/* Booking Details */}
        {bookingResult && (
          <Stack w={'100%'} p={'sm'} bg={'dark.8'}>
            <Group justify={'space-between'}>
              <Text size={'sm'} c={'dimmed'}>
                Booking Number
              </Text>
              <Text size={'sm'} fw={500}>
                #{bookingResult.id}
              </Text>
            </Group>
            <Group justify={'space-between'}>
              <Text size={'sm'} c={'dimmed'}>
                Restaurant
              </Text>
              <Text size={'sm'} fw={500}>
                {bookingResult.restaurant_name}
              </Text>
            </Group>
            <Group justify={'space-between'}>
              <Text size={'sm'} c={'dimmed'}>
                Number of Guests
              </Text>
              <Text size={'sm'} fw={500}>
                {bookingResult.guest_count} {bookingResult.guest_count === 1 ? 'person' : 'people'}
              </Text>
            </Group>
            <Group justify={'space-between'}>
              <Text size={'sm'} c={'dimmed'}>
                Time
              </Text>
              <Text size={'sm'} fw={500}>
                {formatTime(bookingResult.arrival_date)} -{' '}
                {formatTime(bookingResult.departure_date)}
              </Text>
            </Group>
          </Stack>
        )}

        {/* Close Button */}
        <Button size={'md'} color={'teal'} onClick={handleClose} fullWidth>
          Close
        </Button>
      </Stack>
    </>
  );

  return (
    <Modal size={'md'} opened={opened} onClose={handleClose} centered title={restaurantName}>
      {/* Progress Indicator */}
      <Text size={'sm'} mb={'xs'} c={'dimmed'}>
        {getStepText(step)}
      </Text>
      <Progress value={getProgressValue(step)} size={'sm'} color={'teal'} mb={'md'} />

      {/* Render Steps */}
      {step === 1 && renderStep1()}
      {step === 2 && renderStep2()}
      {step === 3 && renderStep3()}
    </Modal>
  );
}
