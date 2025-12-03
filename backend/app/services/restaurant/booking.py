from fastapi import HTTPException
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import Session, joinedload

from app.models import Booking, BookingSlot, RestaurantTable
from app.schemas import BookingRequest, BookingResponse


class BookingService:
    """Business logic for booking operations"""

    @staticmethod
    def create_booking(
        db: Session, user_id: str, request: BookingRequest
    ) -> BookingResponse:
        """
        Create a new booking for a user.

        Validates that:
        - The booking slot exists
        - The restaurant table exists
        - Guest count doesn't exceed table seating capacity
        - User doesn't have overlapping bookings at the same restaurant
        - The slot is not already booked

        Args:
            db: Database session
            user_id: ID of the user creating the booking
            request: Booking request containing slot_id and guest_count

        Returns:
            BookingResponse with created booking details

        Raises:
            HTTPException(404): If slot or table not found
            HTTPException(400): If guest count exceeds table capacity
            HTTPException(409): If user has overlapping booking or slot is already booked
        """

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

        if not restaurant_table:
            raise HTTPException(status_code=404, detail="Table not found")

        if request.guest_count > restaurant_table.seating_count:  # type: ignore
            raise HTTPException(
                status_code=400, detail="Too many guests for this table"
            )

        # Check if user has overlapping bookings at the same restaurant
        overlapping_booking = (
            db.query(Booking)
            .join(BookingSlot)
            .join(RestaurantTable, RestaurantTable.id == BookingSlot.table_id)
            .filter(Booking.user_id == user_id)
            .filter(RestaurantTable.restaurant_id == restaurant_table.restaurant_id)
            .filter(
                # Check for time overlap: new slot overlaps if it starts before existing ends
                # AND ends after existing starts
                BookingSlot.arrival_date < booking_slot.departure_date,
                BookingSlot.departure_date > booking_slot.arrival_date,
            )
            .first()
        )

        if overlapping_booking:
            raise HTTPException(
                status_code=409,
                detail="You already have a booking at this restaurant during this time period",
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

        # Attempt to save - database will reject if slot already booked (race condition protection)
        try:
            db.add(new_booking)
            db.commit()
            db.refresh(new_booking)
        except IntegrityError:
            db.rollback()
            raise HTTPException(status_code=409, detail="Booking already exists")

        return BookingResponse(
            id=new_booking.id,  # type: ignore
            user_id=new_booking.user_id,  # type: ignore
            slot_id=new_booking.booking_slot_id,  # type: ignore
            guest_count=new_booking.guest_count,  # type: ignore
            arrival_date=booking_slot.arrival_date,  # type: ignore
            departure_date=booking_slot.departure_date,  # type: ignore
            restaurant_name=restaurant_table.restaurant.name,
        )
