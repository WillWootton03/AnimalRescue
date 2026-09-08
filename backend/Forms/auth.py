from pydantic import BaseModel

class RegisterForm(BaseModel):
    email: str
    name: str 
    password: str

class LoginForm(BaseModel):
    email: str
    password: str

class NewUser(BaseModel):
    password_hash: str
    name: str
    email: str