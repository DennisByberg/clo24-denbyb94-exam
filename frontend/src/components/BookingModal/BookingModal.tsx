'use client';

import { useState } from 'react';
import { Modal, Stack, Text, Button, Progress, Group, Avatar } from '@mantine/core';
import { DatePicker } from '@mantine/dates';

interface BookingModalProps {
  opened: boolean;
  onClose: () => void;
  restaurantName: string;
  restaurantImage?: string;
}

export default function BookingModal({
  opened,
  onClose,
  restaurantName,
  restaurantImage,
}: BookingModalProps) {
  const today = new Date();
  const [numberOfGuests, setNumberOfGuests] = useState<number | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(
    today.toISOString().split('T')[0]
  );

  const handleClose = () => {
    setNumberOfGuests(null);
    setSelectedDate(today.toISOString().split('T')[0]);
    onClose();
  };

  const handleGuestSelection = (num: number) => {
    setNumberOfGuests(numberOfGuests === num ? null : num);
  };

  const maxDate = new Date();
  maxDate.setDate(maxDate.getDate() + 30);

  return (
    <Modal opened={opened} onClose={handleClose} centered>
      <Stack gap={'lg'} align={'center'}>
        {/* Restaurant Header */}
        <Group gap={'md'} mb={30}>
          <Avatar src={restaurantImage} size={'lg'} radius={'sm'} />
          <Text size={'2rem'} fw={600}>
            {restaurantName}
          </Text>
        </Group>

        <div style={{ textAlign: 'left' }}>
          <Text fw={500} size={'sm'} mb={'xs'}>
            Number of Guests
          </Text>
          <Button.Group>
            {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
              <Button
                key={num}
                variant={numberOfGuests === num ? 'filled' : 'default'}
                onClick={() => handleGuestSelection(num)}
                color={'teal'}
                size={'sm'}
              >
                {num}
              </Button>
            ))}
          </Button.Group>
        </div>

        {/* Date Picker */}
        <DatePicker
          size="lg"
          value={selectedDate}
          onChange={(value) => setSelectedDate(value)}
          minDate={today.toISOString().split('T')[0]}
          maxDate={maxDate.toISOString().split('T')[0]}
        />
        {/* Progress Indicator */}
        <div style={{ width: '100%' }}>
          <Text size={'xs'} ta={'center'} c={'dimmed'} mb={4}>
            Step 1 of 3: Select number of guests and date
          </Text>
          <Progress value={33} size={'sm'} color={'teal'} />
        </div>

        {/* Book Button */}
        <Button size={'md'} color={'teal'} fullWidth disabled={!selectedDate || !numberOfGuests}>
          Bekräfta bokning
        </Button>
      </Stack>
    </Modal>
  );
}
