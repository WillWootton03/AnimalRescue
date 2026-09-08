import jwt
import os

from services.auth import CookieGenerator
from utils.HTTPResponse import HTTPResponse
from typing import Annotated
from fastapi import Cookie, Request, Response, HTTPException

ACCESS_SECRET = os.getenv('ACCESS_SECRET')
REFRESH_SECRET = os.getenv('REFRESH_SECRET')
ALGORITHM = 'HS256'

class Token():
    def create_access_token(user_id : str):
        if not user_id:
            return { 'message' : 'no user_id'} 

        payload = { 'user_id' : user_id }

        access_token = jwt.encode(payload, ACCESS_SECRET, ALGORITHM)

        return access_token


    def create_refresh_token(user_id: str):
        if not user_id:
            return { 'message' : 'no user_id'}

        payload = { 'user_id' : user_id }

        refresh_token = jwt.encode(payload, REFRESH_SECRET, ALGORITHM)

        return refresh_token

def generate_tokens(user_id: str):
    refresh_token = Token.create_refresh_token(user_id)
    access_token = Token.create_access_token(user_id)

    return { 'access_token': access_token, 'refresh_token': refresh_token}


async def refresh_access_token(response: Response, refresh_token: Annotated[str | None, Cookie(alias='refresh_token')] = None):
    if not refresh_token:
        response.status_code = 401
        return HTTPResponse.send_fail('INVALID_REFRESH_TOKEN', 'invalid security tokens')

    try:
        payload = jwt.decode(refresh_token, REFRESH_SECRET, algorithms=[ALGORITHM])
        user_id = payload.get('user_id')

        access_token = Token.create_access_token(user_id)

        CookieGenerator.set_cookies({ 'access_token': access_token }, response)

    except jwt.PyJWTError:
        response.status_code = 403
        return HTTPResponse.send_fail('INVALID_TOKEN', 'invalid refresh_token')


async def auth_middleware(req: Request, call_next):
    token = req.cookies.get('access_token')

    req.state.user_id = None

    if token:
        try:
            payload = jwt.decode(
                token,
                ACCESS_SECRET,
                algorithms=[ALGORITHM],
            )
            req.state.user_id = payload.get('user_id')
        except jwt.PyJWTError:
            pass
    return await call_next(req) 

async def require_user(req: Request):
    if not req.state.user_id:
        raise HTTPException(status_code=401, detail='Not authenticated',)
    return req.state.user_id