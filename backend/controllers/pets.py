from fastapi import APIRouter, Depends
from utils.middelware import require_user

pets_router = APIRouter(
    prefix='/pets',
    tags=['pets'],
    dependencies=[Depends(require_user)]
)

@pets_router.get('/', tags=['pets'])
async def get_user_pets():
    pass

    