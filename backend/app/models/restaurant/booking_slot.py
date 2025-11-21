from sqlalchemy import Column, DateTime, ForeignKey, Integer, UniqueConstraint

from app.db.base import Base


class BookingSlot(Base):
    __tablename__ = "restaurant_booking_slot"

    id = Column(Integer, primary_key=True, autoincrement=True)
    table_id = Column(Integer, ForeignKey("restaurant_table.id"), nullable=False)
    arrival_date = Column(DateTime, nullable=False)
    departure_date = Column(DateTime, nullable=False)

    # Prevent duplicate time slots for the same table
    __table_args__ = (UniqueConstraint("table_id", "arrival_date", "departure_date"),)
