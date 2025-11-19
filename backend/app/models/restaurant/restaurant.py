from app.db.base import Base
from sqlalchemy import Column, String, Integer


class Restaurant(Base):
    __tablename__ = "restaurant"

    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(100), nullable=False)
    total_seating = Column(Integer, nullable=False)
