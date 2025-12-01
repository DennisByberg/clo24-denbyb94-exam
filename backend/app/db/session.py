from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from app.config import settings

# Create database engine
engine = create_engine(settings.database_url, echo=settings.debug)

# Create SessionLocal class
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


# Dependency for FastAPI
def get_db():
    """Provide database session to endpoints."""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
