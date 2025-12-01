from datetime import date
from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.schemas import (
    BookingSlotResponse,
    RestaurantDetailResponse,
    RestaurantResponse,
)
from app.services import RestaurantService

router = APIRouter(prefix="/restaurants", tags=["restaurants"])


@router.get("", response_model=list[RestaurantResponse])
def list_restaurants(db: Annotated[Session, Depends(get_db)]):
    """Get all restaurants"""
    return RestaurantService.get_all_restaurants(db)


@router.get("/{restaurant_id}", response_model=RestaurantDetailResponse)
def get_restaurant(restaurant_id: int, db: Annotated[Session, Depends(get_db)]):
    """Get detailed information about a specific restaurant including tables"""
    restaurant = RestaurantService.get_restaurant_by_id(db, restaurant_id)

    if not restaurant:
        raise HTTPException(status_code=404, detail="Restaurant not found")

    return restaurant


@router.get(
    "/{restaurant_id}/available-slots", response_model=list[BookingSlotResponse]
)
def get_available_booking_slots(
    restaurant_id: int, date: date, guests: int, db: Annotated[Session, Depends(get_db)]
):
    """TODO: WRTITE DESCRIPTION"""
