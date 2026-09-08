from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from controllers import auth, pets, users
from utils.middelware import auth_middleware
from db.db import engine
from db.models import Base


app = FastAPI()

app.include_router(auth.auth_router)
app.include_router(users.users_router)
app.include_router(pets.pets_router)
app.middleware('http')(auth_middleware)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get('/')
async def root():
    return { 'message' : 'None'}