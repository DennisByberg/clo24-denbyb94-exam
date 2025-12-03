from sqlalchemy import CheckConstraint, Column, ForeignKey, Integer, String

from app.db.base import Base


class Booking(Base):
    __tablename__ = "restaurant_booking"

    id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(String(255), ForeignKey("user.id"), nullable=False)
    booking_slot_id = Column(
        Integer, ForeignKey("restaurant_booking_slot.id"), nullable=False
    )
    guest_count = Column(Integer, nullable=False)

    # Ensure at least one guest per booking
    __table_args__ = (CheckConstraint("guest_count > 0"),)
