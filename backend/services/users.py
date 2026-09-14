from sqlalchemy.orm import Session

from repositories.users import get_user_byId, get_user_byEmail

class UserService:
    async def get_user_byId(user_id: str, db: Session):
        result = await get_user_byId(user_id, db)

        return result

    async def get_user_byEmail(email: str, db: Session):
        result = await get_user_byEmail(email, db)

        return result
    