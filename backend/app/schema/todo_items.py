from pydantic import BaseModel
from typing import Optional 

class TodoBase(BaseModel):
    title: str
    description: Optional[str] = None
    completed: bool = False
    is_pinned: bool = False

class TodoCreate(TodoBase):
    title: str
    description: Optional[str] = None
    completed: bool = False
    is_pinned: bool = False

class Todo(TodoBase):
    id: int
    owner_id: int
    
    class Config:
        from_attributes = True

class TodoUpdate(TodoBase):
    title: Optional[str] = None
    description: Optional[str] = None
    completed: Optional[bool] = None
    is_pinned: Optional[bool] = None
    