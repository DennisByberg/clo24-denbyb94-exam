from typing import Union

from pydantic import field_validator
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    """Application settings and configuration."""

    # App Info
    app_name: str = "Ace Group API"
    app_version: str = "0.4.0"
    app_description: str = (
        "REST API for managing restaurant table bookings at ACE Group's dining venues"
    )

    database_url: str = "postgresql://user:password@localhost:5432/restaurant_db"
    debug: bool = True
    mock_auth: bool = False
    nextauth_secret: str = ""
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


settings = Settings()  # type: ignore
