from app.db.base import Base
from sqlalchemy import Column, String


class User(Base):
    __tablename__ = "user"

    id = Column(String(255), primary_key=True)  # Google OAuth ID
    name = Column(String(200), nullable=False)
    email = Column(String(255), unique=True, nullable=False)
    role = Column(String(20), nullable=False, default="customer")
