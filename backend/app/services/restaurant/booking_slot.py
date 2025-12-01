from datetime import date

from sqlalchemy import func
from sqlalchemy.orm import Session

from app.models import Booking, BookingSlot, RestaurantTable


class BookingSlotService:
    """Business logic for booking slots"""

    @staticmethod
    def get_available_slots(
        db: Session, restaurant_id: int, selected_date: date, guests: int
    ):
        """Get available booking slots for a restaurant on a specific date with enough seats"""

        available_slots = (
            db.query(BookingSlot)
            .join(RestaurantTable)
            .filter(RestaurantTable.restaurant_id == restaurant_id)
            .filter(func.date(BookingSlot.arrival_date) == selected_date)
            .filter(RestaurantTable.seating_count >= guests)
            .outerjoin(Booking, Booking.booking_slot_id == BookingSlot.id)
            .filter(Booking.id.is_(None))
            .all()
        )

        unique_times = {}
        for slot in available_slots:
            time_key = slot.arrival_date
            if time_key not in unique_times:
                unique_times[time_key] = slot

        return sorted(unique_times.values(), key=lambda slot: slot.arrival_date)
