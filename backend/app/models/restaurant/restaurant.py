from app.db.base import Base
from sqlalchemy import Column, String, Integer
from sqlalchemy.orm import relationship


class Restaurant(Base):
    __tablename__ = "restaurant"

    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(100), nullable=False)
    total_seating = Column(Integer, nullable=False)

    # Relationship to tables
    tables = relationship("RestaurantTable", back_populates="restaurant", lazy="joined")
