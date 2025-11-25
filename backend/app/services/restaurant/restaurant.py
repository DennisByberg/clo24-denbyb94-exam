from sqlalchemy.orm import Session

from app.models import Restaurant


class RestaurantService:
    """Business logic for restaurant operations"""

    @staticmethod
    def get_all_restaurants(db: Session) -> list[Restaurant]:
        """Get all restaurants from database"""
        return db.query(Restaurant).all()

    @staticmethod
    def get_restaurant_by_id(db: Session, restaurant_id: int) -> Restaurant | None:
        """Get a specific restaurant by ID with its tables"""
        return db.query(Restaurant).filter(Restaurant.id == restaurant_id).first()
