from fastapi import HTTPException
from sqlalchemy.orm import Session, joinedload

from app.models import Booking, BookingSlot, RestaurantTable
from app.schemas import BookingRequest, BookingResponse


class BookingService:
    """Business logic for booking operations"""

    @staticmethod
    def create_booking(
        db: Session, user_id: str, request: BookingRequest
    ) -> BookingResponse:
        """Create a new booking for a user"""

        # Get the booking slot to verify it exists
        booking_slot: BookingSlot | None = (
            db.query(BookingSlot).filter(BookingSlot.id == request.slot_id).first()
        )

        # Validate that the booking slot exists
        if not booking_slot:
            raise HTTPException(status_code=404, detail="Slot not found")

        # Get the restaurant table (with restaurant data) to validate capacity and get restaurant name
        restaurant_table: RestaurantTable | None = (
            db.query(RestaurantTable)
            .options(joinedload(RestaurantTable.restaurant))
            .filter(RestaurantTable.id == booking_slot.table_id)
            .first()
        )

        # Lägg till detta:
        if not restaurant_table:
            raise HTTPException(status_code=404, detail="Table not found")

        # Validate that guest count doesn't exceed table capacity
        if request.guest_count > restaurant_table.seating_count:  # type: ignore
            raise HTTPException(
                status_code=400, detail="Too many guests for this table"
            )

        # Check if the slot is already booked
        existing_booking = (
            db.query(Booking).filter(Booking.booking_slot_id == request.slot_id).first()
        )

        if existing_booking:
            raise HTTPException(status_code=409, detail="Booking already exists")

        # Create and save the new booking
        new_booking = Booking(
            user_id=user_id,
            booking_slot_id=request.slot_id,
            guest_count=request.guest_count,
        )

        db.add(new_booking)
        db.commit()
        db.refresh(new_booking)

        return BookingResponse(
            id=new_booking.id,  # type: ignore
            user_id=new_booking.user_id,  # type: ignore
            slot_id=new_booking.booking_slot_id,  # type: ignore
            guest_count=new_booking.guest_count,  # type: ignore
            arrival_date=booking_slot.arrival_date,  # type: ignore
            departure_date=booking_slot.departure_date,  # type: ignore
            restaurant_name=restaurant_table.restaurant.name,
        )
