export interface BookingSlot {
  id: number;
  table_id: number;
  arrival_date: string; // ISO datetime
  departure_date: string; // ISO datetime
}

export interface BookingRequest {
  restaurant_id: number;
  slot_id: number;
  number_of_guests: number;
}

export interface Booking {
  id: number;
  user_id: number;
  slot_id: number;
  number_of_guests: number;
  created_at: string;
  restaurant_name?: string;
  start_time?: string;
  end_time?: string;
}
