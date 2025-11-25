from pydantic import BaseModel, ConfigDict


class RestaurantTableResponse(BaseModel):
    """Schema for restaurant table in API responses"""

    model_config = ConfigDict(from_attributes=True)

    id: int
    restaurant_id: int
    seating_count: int


class RestaurantResponse(BaseModel):
    """Schema for restaurant in API responses"""

    model_config = ConfigDict(from_attributes=True)

    id: int
    name: str
    total_seating: int


class RestaurantDetailResponse(RestaurantResponse):
    """Schema for detailed restaurant view including tables"""

    tables: list[RestaurantTableResponse]
