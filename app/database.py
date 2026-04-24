import os

from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker

try:
    from dotenv import load_dotenv
except ImportError:
    # If python-dotenv is not installed yet, continue without loading .env.
    def load_dotenv():
        return None
    
#commitlar saqlandi

# Load variables from a local .env file if one exists.
load_dotenv()

DATABASE_URL = os.getenv(
    "DATABASE_URL",
    "postgresql://postgres:postgres@localhost:5432/todo_db",
)

# The engine knows how to talk to PostgreSQL.
engine = create_engine(DATABASE_URL, pool_pre_ping=True)

# Each request gets its own database session.
# expire_on_commit=False lets us safely return objects after commit.
SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine,
    expire_on_commit=False,
)

# Base class for all SQLAlchemy models.
Base = declarative_base()


def get_db():
    """Provide a database session to each request and close it after use."""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
