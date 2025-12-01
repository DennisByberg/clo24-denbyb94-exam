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
import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/api/client';
import { formatTime, formatDate } from '@/lib/utils/dateFormatter';
import { BookingSlot } from '@/types/booking';

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
  const [selectedDate, setSelectedDate] = useState<string | null>(
    today.toISOString().split('T')[0]
  );
  const [selectedSlotId, setSelectedSlotId] = useState<number | null>(null);

  const { data: availableSlots, isLoading } = useQuery<BookingSlot[]>({
    queryKey: ['available-slots', restaurantId, selectedDate, numberOfGuests],
    queryFn: () =>
      apiClient(
        `/api/restaurants/${restaurantId}/available-slots?date=${selectedDate}&guests=${numberOfGuests}`
      ),
    enabled: numberOfGuests !== null && selectedDate !== null,
  });

  const selectedSlot = availableSlots?.find((slot) => slot.id === selectedSlotId);
  const maxDate = new Date();
  maxDate.setDate(maxDate.getDate() + 30);

  const handleClose = () => {
    setStep(1);
    setNumberOfGuests(null);
    setSelectedDate(today.toISOString().split('T')[0]);
    setSelectedSlotId(null);
    onClose();
  };

  const handleGuestSelection = (num: number) => {
    setNumberOfGuests(numberOfGuests === num ? null : num);
  };

  const handleTimeSelection = (slotId: number) => {
    setSelectedSlotId(selectedSlotId === slotId ? null : slotId);
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
              onChange={(value) => setSelectedDate(value)}
              minDate={today.toISOString().split('T')[0]}
              maxDate={maxDate.toISOString().split('T')[0]}
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
          >
            Back
          </Button>
          <Button
            size={'md'}
            color={'teal'}
            onClick={() => setStep(3)}
            rightSection={<IconCheck size={18} />}
          >
            Confirm Booking
          </Button>
        </Group>
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

      {step === 1 && renderStep1()}
      {step === 2 && renderStep2()}
    </Modal>
  );
}
