from datetime import datetime

from pydantic import BaseModel, ConfigDict, Field


class BookingRequest(BaseModel):
    """Schema for creating a new booking"""

    model_config = ConfigDict(from_attributes=True)

    slot_id: int
    guest_count: int = Field(ge=1, le=100)


class BookingResponse(BaseModel):
    """Schema for booking in API responses"""

    model_config = ConfigDict(from_attributes=True)

    id: int
    user_id: str
    slot_id: int
    guest_count: int
    arrival_date: datetime
    departure_date: datetime
    restaurant_name: str
