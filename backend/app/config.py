from typing import Union

from pydantic import field_validator
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    """Application settings and configuration."""

    # App info
    app_name: str = "ESS Booking Platform API"
    app_version: str = "0.2.0"
    app_description: str = "REST API for managing bookings at ESS Group's facility including restaurant, spa, and event spaces"

    # Database
    database_url: str = "postgresql://user:password@localhost:5432/restaurant_db"

    # Environment
    debug: bool = True

    # Authentication
    mock_auth: bool = True

    # Security/CORS
    # Accept both string (from Azure App Settings) and list (from .env)
    allowed_origins: Union[str, list[str]] = [
        "http://localhost:3000",
        "http://localhost:8000",
    ]

    # API
    api_prefix: str = "/api"

    @field_validator("allowed_origins", mode="before")
    @classmethod
    def parse_allowed_origins(cls, v):
        """Parse allowed_origins from string or list.

        Azure App Settings pass as comma-separated string,
        but we want a list for CORS middleware.
        """
        if isinstance(v, str):
            # Split by comma and strip whitespace
            return [origin.strip() for origin in v.split(",")]
        return v

    model_config = SettingsConfigDict(
        env_file=".env",
        case_sensitive=False,
    )


settings = Settings()
