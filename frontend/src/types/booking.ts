export interface BookingSlot {
  slot_id: number;
  start_time: string;
  end_time: string;
  available_tables: number;
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
