from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.dependencies.database import get_db
from app.schemas import RestaurantDetailResponse, RestaurantResponse
from app.services import RestaurantService

router = APIRouter(prefix="/api/restaurants", tags=["restaurants"])


@router.get("", response_model=list[RestaurantResponse])
def list_restaurants(db: Session = Depends(get_db)):
    """Get all restaurants"""
    return RestaurantService.get_all_restaurants(db)


@router.get("/{restaurant_id}", response_model=RestaurantDetailResponse)
def get_restaurant(restaurant_id: int, db: Session = Depends(get_db)):
    """Get detailed information about a specific restaurant including tables"""
    restaurant = RestaurantService.get_restaurant_by_id(db, restaurant_id)

    if not restaurant:
        raise HTTPException(status_code=404, detail="Restaurant not found")

    return restaurant
