from sqlalchemy.orm import Session
from sqlalchemy import select, update, delete, insert

from Forms.pets import NewPet
from db.models import Pet

class PetsRepository():
    async def get_user_pets(user_id: str, db: Session):
        stmt = select(Pet).where(Pet.user_id == user_id)
        pets = db.scalars(stmt).all()

        return pets 

    async def add_user_pet(pet_id: str, user_id: str, db: Session):
        stmt = update(Pet).where(Pet.id == pet_id).values(user_id = user_id)
        db.execute(stmt)
        db.commit()
        return user_id

    async def create_pet(pet_deatils: NewPet, db: Session):
        new_pet = Pet(
            
        )