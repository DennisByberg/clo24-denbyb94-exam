export interface RestaurantTable {
  id: number;
  restaurant_id: number;
  seating_count: number;
}

export interface Restaurant {
  id: number;
  name: string;
  total_seating: number;
  image_url: string | null;
}

export interface RestaurantDetail extends Restaurant {
  tables: RestaurantTable[];
}
