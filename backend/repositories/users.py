from Forms.auth import NewUser

from sqlalchemy import select
from sqlalchemy.orm import Session
from db.models import User

async def register_user(user_data: NewUser, db: Session):
    new_user = User(
        name=user_data['name'],
        email=user_data['email'],
        password_hash=user_data['password_hash']
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return str(new_user.id) 

async def get_user_byId(user_id: str, db: Session):
    user = db.get_one(User, user_id)
    return user

def get_user_byEmail(email: str, db: Session):
    stmt = select(User).where(User.email == email)
    user = db.execute(stmt).scalar_one_or_none()
    return user