from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from models.database import get_db
from models.user import User
from crud import todo_items_crud
from schema import Todo, TodoCreate, TodoUpdate
from core.dependencies import get_current_user

router = APIRouter()

@router.get("/todo_items", response_model=list[Todo])
async def get_todo_items(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Get all todo items for the current authenticated user"""
    return todo_items_crud.get_todo_item_by_user_id(db, user_id=current_user.id)

@router.post("/todo_items", response_model=Todo)
async def create_todo_item(
    todo_item: TodoCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Create a new todo item for the current authenticated user"""
    return todo_items_crud.create_todo_item(db, todo_item, user_id=current_user.id)

@router.put("/todo_items/{todo_item_id}", response_model=Todo)
async def update_todo_item(
    todo_item_id: int,
    todo_item: TodoUpdate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Update a todo item (title, description, etc.)"""
    return todo_items_crud.update_todo_item(db, todo_item_id, todo_item, user_id=current_user.id)

@router.patch("/todo_items/{todo_item_id}/pin", response_model=Todo)
async def pin_todo_item(
    todo_item_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Toggle pin status of a todo item"""
    return todo_items_crud.pin_todo_item(db, todo_item_id, user_id=current_user.id)

@router.patch("/todo_items/{todo_item_id}/complete", response_model=Todo)
async def toggle_complete_todo_item(
    todo_item_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Toggle completed status of a todo item"""
    return todo_items_crud.toggle_complete_todo_item(db, todo_item_id, user_id=current_user.id)

@router.delete("/todo_items/{todo_item_id}", response_model=Todo)
async def delete_todo_item(
    todo_item_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Delete a todo item"""
    return todo_items_crud.delete_todo_item(db, todo_item_id, user_id=current_user.id)

