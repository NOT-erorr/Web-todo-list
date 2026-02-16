from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from models.database import get_db
from models.user import User
from crud import (
    create_user,
    get_user_by_username,
    get_user_by_id,
    get_login_user,
    auth_user,
    delete_user,
    update_user
)  
from schema import UserCreate, User, Token   
import asyncio
import logging
from datetime import datetime, timedelta
from jose import jwt

router = APIRouter()

@router.post("/auth", response_model=User)
async def auth(
    user: UserCreate, 
    db: Session = Depends(get_db)
):
    db_user = get_login_user(db, username=user.username, password=user.password)
    jwt_token = create_access_token(data={"sub": str(db_user.id)})
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return {
        "access_token": jwt_token,
        "token_type": "bearer",
        "user": db_user
    }

def check_token(token: str):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id: str = payload.get("sub")
        if user_id is None:
            raise HTTPException(status_code=401, detail="Not authenticated")
    except JWTError:
        raise HTTPException(status_code=401, detail="Not authenticated")