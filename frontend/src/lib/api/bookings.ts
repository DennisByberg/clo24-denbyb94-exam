import { apiClient } from './client';
import { BookingRequest, BookingResponse } from '@/types/booking';

export async function createBooking(request: BookingRequest): Promise<BookingResponse> {
  return apiClient('/api/bookings', {
    method: 'POST',
    body: JSON.stringify(request),
  });
}
