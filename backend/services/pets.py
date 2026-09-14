from sqlalchemy.orm import Session

from repositories.pets import PetsRepository as repo

class PetsService:
    async def get_user_pets(user_id: str, db: Session):
        return await repo.get_user_pets(user_id, db)

    async def add_user_pet(pet_id: str, user_id: str, db: Session):
        return await repo.add_user_pet(pet_id, user_id, db)