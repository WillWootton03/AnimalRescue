from typing import List, Optional, Literal
import uuid
from enum import Enum

from sqlalchemy import ForeignKey, String, Integer, Uuid, Float, text
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, relationship

class AnimalType(Enum):
    DOG = "dog"
    CAT = "cat"
    OTHER = "other"

class Base(DeclarativeBase):
    pass

class Pet(Base):
    __tablename__ = "pets"

    id: Mapped[uuid.UUID] = mapped_column(Uuid, primary_key=True, server_default=text("gen_random_uuid()"))
    user_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("users.id", ondelete="CASCADE"))
    owner: Mapped["User"] = relationship("User", back_populates="pets")
    name: Mapped[str] = mapped_column(String(50))
    type: Mapped[str] = mapped_column(String(20))
    age: Mapped[int] = mapped_column(Integer, server_default="-1")
    days_stay: Mapped[int] = mapped_column(Integer, server_default="-1")
    amount_due: Mapped[float] = mapped_column(Float, server_default="-1.0")

    def __repr__(self):
        return f"id: {self.id}\nname: {self.name}\nowner: {self.user_id}"

class User(Base):
    __tablename__ = "users"

    id: Mapped[uuid.UUID] = mapped_column(Uuid, primary_key=True, server_default=text("gen_random_uuid()"))
    name: Mapped[str] = mapped_column(String)
    pets: Mapped[List["Pet"]] = relationship("Pet", back_populates="owner", cascade="all, delete-orphan", passive_deletes=True)
    password_hash: Mapped[str] = mapped_column(String)
    email: Mapped[str] = mapped_column(String)
    