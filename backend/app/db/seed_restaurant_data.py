"""Seed database with test data for ESS Restaurants."""

from datetime import datetime, timedelta

from app.db.session import SessionLocal
from app.models import BookingSlot, Restaurant, RestaurantTable

# Configuration
RESTAURANTS = [
    {
        "name": "ESS Burgers",
        "table_sizes": [2, 2, 4, 4, 6],
        "image_url": "https://essimages.blob.core.windows.net/restaurant-images/restaurant-burgers.jpeg",
    },
    {
        "name": "ESS Sushi",
        "table_sizes": [2, 2, 3, 4, 4, 6, 6, 8],
        "image_url": "https://essimages.blob.core.windows.net/restaurant-images/restaurant-sushi.jpeg",
    },
    {
        "name": "ESS Pizza",
        "table_sizes": [2, 4, 4, 6, 8, 10],
        "image_url": "https://essimages.blob.core.windows.net/restaurant-images/restaurant-pizza.jpeg",
    },
    {
        "name": "ESS Steakhouse",
        "table_sizes": [2, 2, 2, 4, 4],
        "image_url": "https://essimages.blob.core.windows.net/restaurant-images/restaurant-steakhouse.jpeg",
    },
    {
        "name": "ESS Vegan",
        "table_sizes": [2, 2, 4, 6, 8],
        "image_url": "https://essimages.blob.core.windows.net/restaurant-images/restaurant-vegan.jpeg",
    },
    {
        "name": "ESS Seafood",
        "table_sizes": [2, 4, 4, 4, 6, 6],
        "image_url": "https://essimages.blob.core.windows.net/restaurant-images/restaurant-seafood.jpeg",
    },
]
DAYS_AHEAD = 30
LUNCH_TIMES = [(12, 0), (12, 30), (13, 0), (13, 30)]
DINNER_TIMES = [(18, 0), (18, 30), (19, 0), (19, 30), (20, 0), (20, 30)]


def create_booking_slots(tables, days=DAYS_AHEAD):
    """Generate all booking slots for tables."""
    slots = []
    today = datetime.now().replace(hour=0, minute=0, second=0, microsecond=0)
    times = LUNCH_TIMES + DINNER_TIMES

    for day in range(days):
        date = today + timedelta(days=day)
        for table in tables:
            for hour, minute in times:
                arrival = date.replace(hour=hour, minute=minute)
                slots.append(
                    BookingSlot(
                        table_id=table.id,
                        arrival_date=arrival,
                        departure_date=arrival + timedelta(hours=2),
                    )
                )
    return slots


def seed():
    """Seed the database."""
    print("Starting seed...")

    db = SessionLocal()
    try:
        # Clear old data
        print("Clearing old data...")
        db.query(BookingSlot).delete()
        db.query(RestaurantTable).delete()
        db.query(Restaurant).delete()
        db.commit()

        # Create restaurants and their tables
        for restaurant_config in RESTAURANTS:
            # Create restaurant
            restaurant = Restaurant(
                name=restaurant_config["name"],
                total_seating=sum(restaurant_config["table_sizes"]),
                image_url=restaurant_config["image_url"],
            )
            db.add(restaurant)
            db.commit()
            print(f"Created restaurant: {restaurant.name}")

            # Create tables
            tables = [
                RestaurantTable(restaurant_id=restaurant.id, seating_count=size)
                for size in restaurant_config["table_sizes"]
            ]
            db.bulk_save_objects(tables)
            db.commit()
            print(f"Created {len(tables)} tables for {restaurant.name}")

            # Refresh tables to get IDs
            tables = (
                db.query(RestaurantTable).filter_by(restaurant_id=restaurant.id).all()
            )

            # Create booking slots
            slots = create_booking_slots(tables)
            db.bulk_save_objects(slots)
            db.commit()
            print(f"Created {len(slots)} booking slots for {restaurant.name}")

        print("Seed complete!")
    except Exception as ex:
        print(f"Error: {ex}")
        db.rollback()
        raise
    finally:
        db.close()


if __name__ == "__main__":
    seed()
