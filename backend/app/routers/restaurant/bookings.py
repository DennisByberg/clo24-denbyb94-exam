from typing import Annotated, Literal

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.db import get_db
from app.dependencies import get_current_user
from app.models import User
from app.schemas import BookingRequest, BookingResponse
from app.services import BookingService

router = APIRouter(prefix="/bookings", tags=["bookings"])


@router.get("/me", response_model=list[BookingResponse], status_code=200)
def get_bookings(
    db: Annotated[Session, Depends(get_db)],
    current_user: Annotated[User, Depends(get_current_user)],
    booking_filter: Literal["upcoming", "past"] | None = None,
):
    """
    Get all bookings for the authenticated user.

    Args:
        db: Database session
        current_user: Authenticated user requesting their bookings
        booking_filter: Optional filter - "upcoming" for future bookings, "past" for past bookings, None for all

    Returns:
        List of BookingResponse with booking details and restaurant information
    """
    return BookingService.get_user_bookings(db, current_user.id, booking_filter)  # type: ignore


@router.post("", response_model=BookingResponse, status_code=201)
def create_booking(
    db: Annotated[Session, Depends(get_db)],
    current_user: Annotated[User, Depends(get_current_user)],
    request: BookingRequest,
):
    """
    Create a new booking for the authenticated user.

    Args:
        db: Database session
        current_user: Authenticated user making the booking
        request: Booking details including slot_id and guest_count

    Returns:
        BookingResponse with booking details and restaurant information

    Raises:
        404: If slot or table not found
        400: If guest count exceeds table capacity
        409: If slot is already booked

    Important:
        - Slots can only be booked once.
        - Guest count must not exceed table capacity.
    """
    return BookingService.create_booking(db, current_user.id, request)  # type: ignore
