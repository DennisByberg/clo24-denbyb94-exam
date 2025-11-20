from sqlalchemy import Column, ForeignKey, Integer, CheckConstraint
from app.db.base import Base


class RestaurantTable(Base):
    __tablename__ = "restaurant_table"

    id = Column(Integer, primary_key=True, autoincrement=True)
    restaurant_id = Column(Integer, ForeignKey("restaurant.id"), nullable=False)
    seating_count = Column(Integer, nullable=False)

    # Table capacity must be between 1 and 20 guests
    __table_args__ = (CheckConstraint("seating_count > 0 AND seating_count <= 20"),)
