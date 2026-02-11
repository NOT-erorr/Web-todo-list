from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from models.database import Base, engine, get_db
from crud import crud  
from schema import schemas  

import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)
# Tạo tables
Base.metadata.create_all(bind=engine)

app = FastAPI()

# ============= USER ENDPOINTS =============
@app.post("/users/", response_model=schemas.User)  
def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    db_user = crud.get_user_by_username(db, username=user.username)
    if db_user:
        raise HTTPException(status_code=400, detail="Username already registered")
    return crud.create_user(db=db, user=user)

@app.get("/users/{user_id}", response_model=schemas.User)
def read_user(user_id: int, db: Session = Depends(get_db)):
    db_user = crud.get_user(db, user_id=user_id)
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return db_user

# ============= TODO ENDPOINTS =============
@app.get("/todos/", response_model=list[schemas.Todo])
def read_todos(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    todos = crud.get_todos(db, skip=skip, limit=limit)
    return todos

@app.post("/users/{user_id}/todos/", response_model=schemas.Todo)
def create_todo_for_user(
    user_id: int,
    todo: schemas.TodoCreate,
    db: Session = Depends(get_db)
):
    return crud.create_todo(db=db, todo=todo, user_id=user_id)

@app.put("/todos/{todo_id}", response_model=schemas.Todo)
def update_todo(todo_id: int, completed: bool, db: Session = Depends(get_db)):
    db_todo = crud.update_todo(db, todo_id=todo_id, completed=completed)
    if db_todo is None:
        raise HTTPException(status_code=404, detail="Todo not found")
    return db_todo

@app.delete("/todos/{todo_id}")
def delete_todo(todo_id: int, db: Session = Depends(get_db)):
    db_todo = crud.delete_todo(db, todo_id=todo_id)
    if db_todo is None:
        raise HTTPException(status_code=404, detail="Todo not found")
    return {"message": "Todo deleted successfully"}

@app.get("/")
def root():
    return {"message": "Todo API with FastAPI written by Quoc Long <3"}