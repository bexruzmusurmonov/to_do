from pathlib import Path

from fastapi import FastAPI
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles

from . import models
from .database import engine
from .routers import todos
# Bu birinchi commit
#Bu ikkinchi commit
# Create database tables automatically for this beginner project.
models.Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="FastAPI Todo CRUD",
    description="A simple Todo API using FastAPI, PostgreSQL, and SQLAlchemy.",
    version="1.0.0",
)

static_dir = Path(__file__).resolve().parent / "static"

app.mount("/static", StaticFiles(directory=static_dir), name="static")
app.include_router(todos.router)


@app.get("/")
def read_root():
    return FileResponse(static_dir / "index.html")


@app.get("/health")
def health_check():
    return {"status": "ok"}
