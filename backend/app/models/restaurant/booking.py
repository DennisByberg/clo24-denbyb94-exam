from sqlalchemy import Column, Integer, String, ForeignKey, CheckConstraint
from app.db.base import Base


class Booking(Base):
    __tablename__ = "booking"

    id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(
        String(255), ForeignKey("user.id"), nullable=False
    )  # Google OAuth ID
    booking_slot_id = Column(Integer, ForeignKey("booking_slot.id"), nullable=False)
    guest_count = Column(Integer, nullable=False)

    # Ensure at least one guest per booking
    __table_args__ = (CheckConstraint("guest_count > 0"),)
