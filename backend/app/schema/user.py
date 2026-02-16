from pydantic import BaseModel
from typing import Optional

class UserBase(BaseModel):
    username: str

class UserCreate(BaseModel):
    username: str
    password: str

class User(UserBase):
    id: int
    is_active: bool = True
    
    class Config:
        from_attributes = True
