from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from models.database import get_db
from crud import user_crud
from schema import UserCreate, User, Token
from core.dependencies import create_access_token

router = APIRouter()

@router.post("/login", response_model=Token)
async def login(
    user: UserCreate, 
    db: Session = Depends(get_db)
):
    """Login endpoint - authenticate user and return JWT token"""
    # Authenticate user with username and password
    db_user = user_crud.get_login_user(db, username=user.username, password=user.password)
    
    if db_user is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password"
        )
    
    # Create JWT token after successful authentication
    jwt_token = create_access_token(data={"sub": str(db_user.id)})
    
    return {
        "access_token": jwt_token,
        "token_type": "bearer"
    }


@router.post("/register", response_model=Token)
async def register(
    user: UserCreate, 
    db: Session = Depends(get_db)
):
    """Register endpoint - create new user and return JWT token"""
    # Check if username already exists
    db_user = user_crud.get_user_by_username(db, username=user.username)
    if db_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Username already exists"
        )
    
    # Create new user
    db_user = user_crud.create_user(db=db, username=user.username, password=user.password)
    
    # Create JWT token for new user
    jwt_token = create_access_token(data={"sub": str(db_user.id)})
    
    return {
        "access_token": jwt_token,
        "token_type": "bearer"
    }
