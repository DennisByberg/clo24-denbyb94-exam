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
            db.query(BookingSlot)  # Start query with all booking slots
            .join(RestaurantTable)  # Join to get table information (size, restaurant)
            .filter(
                RestaurantTable.restaurant_id == restaurant_id
            )  # Only this restaurant
            .filter(
                func.date(BookingSlot.arrival_date) == selected_date
            )  # Only selected date
            .filter(RestaurantTable.seating_count >= guests)  # Table must fit guests
            .outerjoin(
                Booking, Booking.booking_slot_id == BookingSlot.id
            )  # Check for bookings
            .filter(
                Booking.id.is_(None)
            )  # Keep only slots without bookings (available)
            .all()  # Execute query and return list
        )
