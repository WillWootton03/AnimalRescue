from typing import Annotated
from fastapi import APIRouter, Depends, Response
from sqlalchemy.orm import Session

from db.db import get_secure_db
from utils.middelware import require_user

from services.users import UserService

users_router = APIRouter(
    prefix='/users',
    tags=['users'],
    dependencies=[Depends(require_user)]
)

@users_router.get('/')
async def get_me(user_id: str = Depends(require_user)):
    print(user_id)
    return user_id

"""
    Useful on getting other users id if necessary

@users_router.get('/{user_id}')
async def get_user_byId(user_id: str, db: Session = Depends(get_secure_db)):
    return UserService.get_user_byId(user_id, db)
"""
@users_router.get('/{email}')
async def get_user_byEmail(email: str, db: Session = Depends(get_secure_db)):
    return UserService.get_user_byEmail(email, db)
