from fastapi import APIRouter, Response, Depends
from Forms import auth
from utils.HTTPResponse import HTTPResponse
from services.auth import AuthService
from services.auth import CookieGenerator
from utils.middelware import generate_tokens
from db.db import get_db
from sqlalchemy.orm import Session  

auth_router = APIRouter(
    prefix='/auth',
    tags=['auth'],
    dependencies=[Depends(get_db)]
)

@auth_router.post('/register')
async def register(form: auth.RegisterForm, res : Response, db: Session = Depends(get_db)):
    if not form.name or not form.email or not form.password:
        return HTTPResponse.send_fail('invalid_form_items', 'missing required form fields')

    user_id = await AuthService.register_user(form, db)

    if user_id:
        tokens = generate_tokens(user_id)
        CookieGenerator.set_cookies(tokens, res)
        return HTTPResponse.send_success(user_id, f'registered new user at {user_id}')

    else:
        return HTTPResponse.send_fail('FAILED_POST', 'failed to register new user')

@auth_router.post('/login')
async def login(form: auth.LoginForm, res: Response, db: Session = Depends(get_db)):
    if not form.email or not form.password:
        return HTTPResponse.send_fail('invalid_form_items', 'missing required form fields')

    result = await AuthService.login(form, db)
    user_id = str(result.id)

    if user_id:
        tokens = generate_tokens(user_id)
        CookieGenerator.set_cookies(tokens, res)
        return HTTPResponse.send_success(user_id, f'logged in user at {user_id}')

    else:
        return HTTPResponse.send_fail('FAILED_POST', 'failed to log in user')

    
