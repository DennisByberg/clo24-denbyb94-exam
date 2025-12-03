export interface BookingSlot {
  id: number;
  table_id: number;
  arrival_date: string; // ISO datetime
  departure_date: string; // ISO datetime
}

export interface BookingRequest {
  slot_id: number;
  guest_count: number;
}

export interface BookingResponse {
  id: number;
  user_id: string;
  slot_id: number;
  guest_count: number;
  arrival_date: string;
  departure_date: string;
  restaurant_name: string;
}
