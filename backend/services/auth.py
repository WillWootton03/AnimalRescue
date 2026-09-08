from fastapi import HTTPException, Response
import os
from argon2 import PasswordHasher
from dotenv import load_dotenv
from sqlalchemy.orm import Session

from Forms.auth import RegisterForm, LoginForm

from repositories.users import register_user, get_user_byEmail

load_dotenv()
COOKIE_DEFAULTS = {
    'httponly': True,
    'secure': True if os.environ.get('prod') else False,
    'samesite': 'lax'
}

# Tokens TTL
ACCESS_TTL = 30 * 60
REFRESH_TTL = 30 * 24 * 60 * 60

class CookieGenerator:

    def set_cookies(tokens : dict, res : Response, **kwargs):
        if not tokens:
            return { 'message' : 'invalid tokens'}

        cookie_settings = {**COOKIE_DEFAULTS, **kwargs}

        if tokens.get('access_token'):
            res.set_cookie(key='access_token', value=tokens['access_token'], **cookie_settings, max_age=ACCESS_TTL)
        if tokens.get('refresh_token'):
            res.set_cookie(key='refresh_token', value=tokens['refresh_token'], **cookie_settings, max_age=REFRESH_TTL) 

        

    def clear_cookies(res : Response, **kwargs):

        cookie_settings = {**COOKIE_DEFAULTS, **kwargs}

        res.delete_cookie(key='access_token', **cookie_settings)
        res.delete_cookie(key='refresh_token', **cookie_settings)


ph = PasswordHasher(
    time_cost=3,
    memory_cost=65536,
    parallelism=3,
    hash_len=32,
    salt_len=16
)

class AuthService:

    async def register_user(form: RegisterForm, db: Session):
        password_hash = ph.hash(form.password)

        result = await register_user({ 'password_hash': password_hash, 'name': form.name, 'email': form.email }, db)
        return result

    async def login(form: LoginForm, db: Session):
        result = get_user_byEmail(form.email, db)
        match = ph.verify(result.password_hash, form.password)
        
        if not match:
            raise HTTPException(400, 'invalid passsword')
        elif result:
            return result
