"""Seed database with test data for ESS Restaurant X."""

from datetime import datetime, timedelta

from app.db.session import SessionLocal
from app.models import BookingSlot, Restaurant, RestaurantTable


def seed():
    """Seed the database."""
    print("Starting seed...")

    db = SessionLocal()
    try:
        # Clear existing data (idempotent - can run multiple times)
        print("Clearing old data...")
        db.query(BookingSlot).delete()
        db.query(RestaurantTable).delete()
        db.query(Restaurant).delete()
        db.commit()
        print("Old data cleared")

        # Create restaurant
        print("Creating ESS Restaurant X...")
        restaurant = Restaurant(
            name="ESS Restaurant X",
            total_seating=35,
        )
        db.add(restaurant)
        db.commit()
        print(f"Created restaurant (ID: {restaurant.id})")

        # Create tables
        print("Creating 8 tables...")
        table_sizes = [2, 2, 3, 4, 4, 6, 6, 8]
        tables = []
        for size in table_sizes:
            table = RestaurantTable(restaurant_id=restaurant.id, seating_count=size)
            db.add(table)
            tables.append(table)
        db.commit()
        print(f"Created {len(table_sizes)} tables")

        # Create booking slots
        print("Creating booking slots for 30 days...")
        today = datetime.now().replace(hour=0, minute=0, second=0, microsecond=0)

        lunch_times = [(12, 0), (12, 30), (13, 0), (13, 30)]
        dinner_times = [(18, 0), (18, 30), (19, 0), (19, 30), (20, 0), (20, 30)]
        all_times = lunch_times + dinner_times

        slot_count = 0
        for day in range(30):  # 30 days
            current_date = today + timedelta(days=day)

            for table in tables:  # Each table
                for hour, minute in all_times:  # Each time slot
                    arrival = current_date.replace(hour=hour, minute=minute)
                    departure = arrival + timedelta(hours=2)  # 2-hour booking slot

                    slot = BookingSlot(
                        table_id=table.id,
                        arrival_date=arrival,
                        departure_date=departure,
                    )
                    db.add(slot)
                    slot_count += 1

        db.commit()
        print(f"Created {slot_count} booking slots")

        print("Seed complete!")
    finally:
        db.close()


if __name__ == "__main__":
    seed()
