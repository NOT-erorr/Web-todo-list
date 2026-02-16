from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi import Request
from pydantic import validate_call
from jose import JWTError
from sqlalchemy.orm import Session
from models.database import Base, engine, get_db
from routers import (
    auth_router,
    login_router,
    todo_items_router,
    user_router
)
from crud import *  
from schema import *  
import asyncio
import logging
from datetime import datetime, timedelta
from jose import jwt

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)
# Tạo tables
Base.metadata.create_all(bind=engine)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "PATCH", "DELETE"],
    allow_headers=["Authorization", "Content-Type"],
)
#============LOGIN ENDPOINTS============
app.include_router(login_router)
#============AUTH ENDPOINTS============
app.include_router(auth_router)
#============USER ENDPOINTS============
app.include_router(user_router)
#============TO DO ITEMS ENDPOINTS============
app.include_router(todo_items_router)
