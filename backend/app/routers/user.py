from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from models.database import get_db
from models.user import User
from crud import user_crud
from schema import UserCreate, User
from jose import jwt
from datetime import datetime, timedelta
from .auth import check_token

router = APIRouter()

@router.post("/users", response_model=User)
async def create_user(
    user: UserCreate,
    db: Session = Depends(get_db)
):
    return user_crud.create_user(db=db, user=user)

@router.get("/users/{user_id}", response_model=User)
async def get_user(
    user_id: int,
    db: Session = Depends(get_db)
):
    return user_crud.get_user_by_id(db=db, user_id=user_id)

@router.put("/users/{user_id}", response_model=User)
async def update_user(
    user_id: int,
    user: UserCreate,
    db: Session = Depends(get_db)
):
    return user_crud.update_user(db=db, user_id=user_id, user=user)

@router.delete("/users/{user_id}", response_model=User)
async def delete_user(
    user_id: int,
    db: Session = Depends(get_db)
):
    return user_crud.delete_user(db=db, user_id=user_id)
