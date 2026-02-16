from models.user import User
from sqlalchemy.orm import Session
import bcrypt

# create user
def create_user(db: Session, username: str, password: str):
    hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
    db_user = User(username=username, hashed_password=hashed_password.decode('utf-8'))
    if db_user is None:
        raise HTTPException(status_code=500, detail="User already created")
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

# get user by username
def get_user_by_username(db: Session, username: str):
    return db.query(User).filter(User.username == username).first()

# get user by id
def get_user_by_id(db: Session, user_id: int):
    return db.query(User).filter(User.id == user_id).first()

# get login user
def get_login_user(db: Session, username: str, password: str):
    db_user = get_user_by_username(db, username)
    if db_user is None:
        return None
    if not bcrypt.checkpw(password.encode('utf-8'), db_user.hashed_password.encode('utf-8')):
        return None
    return db_user

def auth_user(db: Session, username: str, password: str):
    db_user = get_login_user(db, username, password)
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    if not bcrypt.checkpw(
        password.encode('utf-8'), 
        db_user.hashed_password.encode('utf-8')
    ):
        raise HTTPException(status_code=401, detail="User not found")
    return db_user
# Delete user
def delete_user(db: Session, user_id: int):
    db_user = get_user_by_id(db, user_id)
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    db.delete(db_user)
    db.commit()
    return db_user

# Update user
def update_user(db: Session, user_id: int, username: str, password: str):
    db_user = get_user_by_id(db, user_id)
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    db_user.username = username
    db_user.hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')
    db.commit()
    db.refresh(db_user)
    return db_user
    