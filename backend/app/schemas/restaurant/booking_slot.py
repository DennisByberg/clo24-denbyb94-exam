from datetime import datetime

from pydantic import BaseModel, ConfigDict


class BookingSlotResponse(BaseModel):
    """Schema for available booking slots"""

    model_config = ConfigDict(from_attributes=True)

    id: int
    table_id: int
    arrival_date: datetime
    departure_date: datetime
