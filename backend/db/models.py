from typing import List, Optional, Literal
import uuid
from enum import Enum
from datetime import datetime, timezone

from sqlalchemy import ForeignKey, String, Integer, Uuid, Float, text, Enum as SQLEnum, DateTime
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, relationship

class AnimalType(Enum):
    DEFAULT = 'default'
    DOG = "dog"
    CAT = "cat"
    OTHER = "other"

class EmployeeRole(Enum):
    DEFAULT = 'default'
    OWNER = 'owner'
    ADMIN = 'admin'
    EMPLOYEE = 'employee'
    OTHER = 'other'

class ApplicationStatus(Enum):
    ACCEPTED = 'accepted'   
    REJECTED = 'rejected'
    PENDING = 'pending'

class Base(DeclarativeBase):
    pass

class Pet(Base):
    __tablename__ = "pets"

    id: Mapped[uuid.UUID] = mapped_column(Uuid, primary_key=True, server_default=text("gen_random_uuid()"))

    user_id: Mapped[uuid.UUID | None] = mapped_column(ForeignKey("users.id", ondelete="SET NULL"), nullable=True)
    shelter_id: Mapped[uuid.UUID | None] = mapped_column(ForeignKey("shelters.id", ondelete="SET NULL"), nullable=True)

    owner: Mapped["User | None"] = relationship("User", back_populates="pets")
    shelter: Mapped[Shelter] = relationship("Shelter", back_populates="pets")
    applications: Mapped[List["Application"]] = relationship('Application', back_populates="pets", passive_deletes=True)
    appointments: Mapped[List["Appointment"]] = relationship('Appointment', back_populates="pets", passive_deletes=True)

    name: Mapped[str] = mapped_column(String(50))
    type: Mapped[AnimalType] = mapped_column(SQLEnum(AnimalType), default=AnimalType.DEFAULT)
    breed: Mapped[str] = mapped_column(String(50))
    age: Mapped[int] = mapped_column(Integer, server_default="-1")
    days_in: Mapped[int] = mapped_column(Integer, server_default="-1")
    adoption_price: Mapped[float] = mapped_column(Float, server_default="-1.0")

    def __repr__(self):
        return f"id: {self.id}\nname: {self.name}\nowner: {self.user_id}"

class User(Base):
    __tablename__ = "users"

    id: Mapped[uuid.UUID] = mapped_column(Uuid, primary_key=True, server_default=text("gen_random_uuid()"))
    name: Mapped[str] = mapped_column(String)
    password_hash: Mapped[str] = mapped_column(String)
    email: Mapped[str] = mapped_column(String)

    shelter_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("shelters.id", ondelete="RESTRICT"))
    role: Mapped[EmployeeRole] = mapped_column(SQLEnum(EmployeeRole), default=EmployeeRole.DEFAULT)

    shelter: Mapped["Shelter | None"] = relationship("Shelter", back_populates="shelter")
    pets: Mapped[List["Pet"]] = relationship("Pet", back_populates="owner", passive_deletes=True)
    applications: Mapped[List["Application"]] = relationship("Application", back_populates="user", passive_deletes=True)
    appointments: Mapped[List["Appointment"]] = relationship("Appointment", back_populates="user", passive_deletes=True)

class Shelter(Base):
    __tablename__ = 'shelters'

    id: Mapped[uuid.UUID] = mapped_column(Uuid, primary_key=True, server_default=text("gen_random_uuid()"))
    name: Mapped[str] = mapped_column(String(50))
    size: Mapped[int] = mapped_column(Integer, server_default="-1")
    external_link: Mapped[str] = mapped_column(String) 

    employees: Mapped[List["User"]] = relationship("User", back_populates="shelter", passive_deletes=True)
    pets: Mapped[List["Pet"]] = relationship("Pet", back_populates="shelter", passive_deletes=True)

    geo_location1: Mapped[str] = mapped_column(String(2))
    geo_location2: Mapped[str] = mapped_column(String(2))   
    longitude: Mapped[float] = mapped_column(Float, server_default="-1.0")
    latitude: Mapped[float] = mapped_column(Float, server_default="-1.0")

class Application(Base):
    __tablename__ = 'applications'

    id: Mapped[uuid.UUID] = mapped_column(Uuid, primary_key=True, server_default=text("gen_random_uuid()"))

    user_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("users.id", ondelete="CASCADE"))
    user: Mapped["User"] = relationship("User", back_populates="applications", passive_deletes=True)  

    pet_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("pets.id", ondelete="CASCADE"))  
    pet: Mapped["Pet"] = relationship("Pet", back_populates="applications", passive_deletes=True)

    status: Mapped[ApplicationStatus] = mapped_column(SQLEnum(ApplicationStatus), default=ApplicationStatus.PENDING)
    user_notes: Mapped[str] = mapped_column(String(500))
    shelter_notes: Mapped[str] = mapped_column(String(1000))

    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))
    updated_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc))

class Appointment(Base):
    __tablename__ = 'appointments' 

    id: Mapped[uuid.UUID] = mapped_column(Uuid, primary_key=True, server_default=text("gen_random_uuid()"))

    user_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("users.id", ondelete="CASCADE"))
    user: Mapped["User"] = relationship("User", back_populates='applications', passive_deletes=True)

    pet_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("pets.id", ondelete="CASCADE"))
    pet: Mapped["Pet"] = relationship("Pet", back_populates='applications', passive_deletes=True)

    scheduled_for: Mapped[datetime | None] = mapped_column(DateTime(timezone=True), default=None)

"""
TODO : Messages and Message Thred
class Message(Base):
    __tablename__ = 'messages'

    id: Mapped[uuid.UUID] = mapped_column(Uuid, primary_key=True, server_default=text("gen_random_uuid()"))

    user_id: Mapped[uuid.UUID] = relationship(ForeignKey("users.id", ondelete="CASCADE"))
    shelter_id: Mapped[uuid.UUID] = relationship(ForeignKey("shelters.id", ondelete="CASCADE"))


    last_sent: Mapped[uuid.UUID] = mapped_column(Uuid)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))
    updated_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))
"""