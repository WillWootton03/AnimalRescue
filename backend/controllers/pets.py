from fastapi import APIRouter, Depends
from utils.middelware import require_user

from sqlalchemy.orm import Session

from db.db import get_secure_db
from utils.middelware import require_user

from services.pets import PetsService as service

pets_router = APIRouter(
    prefix='/pets',
    tags=['pets'],
    dependencies=[Depends(require_user)]
)

@pets_router.get('/me')
async def get_user_pets(user_id: str = Depends(require_user), db: Session = Depends(get_secure_db)):
    return service.get_user_pets(user_id, db)

@pets_router.post('/me')
async def add_user_pet(pet_id: str, user_id: str = Depends(require_user), db: Session = Depends(get_secure_db)):
    return service.add_user_pet(pet_id, user_id, db)
    