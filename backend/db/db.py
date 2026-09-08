import os
from sqlalchemy import create_engine, text
from sqlalchemy.orm import sessionmaker, Session
from contextlib import contextmanager
from dotenv import load_dotenv  

load_dotenv()
DATABASE_URL = os.environ.get('DATABASE_URL')

engine = create_engine(DATABASE_URL, pool_pre_ping=True)

# Creates isolated sessions per request
SessionLocal = sessionmaker(bind=engine, autoflush=False)


@contextmanager
def rls_transaction(session: Session, user_id: str):
    with session.begin():
        session.execute(
            text('SET LOCAL app.user_id = :uid;'),
            {'uid': str(user_id)}
        )

        yield session

def get_secure_db(user_id: str):
    db_session = SessionLocal()

    try:
        with rls_transaction(db_session, user_id) as secure_session:
            yield secure_session
    finally:
        db_session.close()

# Used for auth routes where no user_id necessary
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()