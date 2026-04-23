from typing import Optional

from pydantic import BaseModel, ConfigDict, Field


class TodoBase(BaseModel):
    title: str = Field(..., min_length=1, max_length=150)
    description: Optional[str] = Field(default=None, max_length=500)


class TodoCreate(TodoBase):
    pass


class TodoUpdate(BaseModel):
    # All fields are optional here so we can send partial updates.
    title: Optional[str] = Field(default=None, min_length=1, max_length=150)
    description: Optional[str] = Field(default=None, max_length=500)
    completed: Optional[bool] = None


class Todo(TodoBase):
    id: int
    completed: bool

    # Let Pydantic read data directly from SQLAlchemy model objects.
    model_config = ConfigDict(from_attributes=True)
