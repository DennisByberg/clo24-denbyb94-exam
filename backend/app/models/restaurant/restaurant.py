from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship

from app.db.base import Base


class Restaurant(Base):
    __tablename__ = "restaurant"

    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(100), nullable=False)
    total_seating = Column(Integer, nullable=False)

    # Relationship to tables
    tables = relationship("RestaurantTable", back_populates="restaurant")
