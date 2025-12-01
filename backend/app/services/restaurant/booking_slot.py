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

        return (
            db.query(BookingSlot)
            .join(RestaurantTable)
            .filter(RestaurantTable.restaurant_id == restaurant_id)
            .filter(func.date(BookingSlot.arrival_date) == selected_date)
            .filter(RestaurantTable.seating_count >= guests)
            .outerjoin(Booking, Booking.booking_slot_id == BookingSlot.id)
            .filter(Booking.id.is_(None))
            .all()
        )
