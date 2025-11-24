from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    """Application settings and configuration."""

    # App info
    app_name: str = "ESS Booking Platform API"
    app_version: str = "0.1.0"
    app_description: str = "REST API for managing bookings at ESS Group's facility including restaurant, spa, and event spaces"

    # Database
    database_url: str = "postgresql://user:password@localhost:5432/restaurant_db"

    # Environment
    debug: bool = True

    # Authentication
    mock_auth: bool = True

    # Security/CORS
    allowed_origins: list[str] = ["http://localhost:3000", "http://localhost:8000"]

    # API
    api_prefix: str = "/api"

    model_config = SettingsConfigDict(
        env_file=".env",
        case_sensitive=False,
    )


settings = Settings()
