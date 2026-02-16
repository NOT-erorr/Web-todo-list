from models.todo_items import Todo_items
from sqlalchemy.orm import Session
from fastapi import HTTPException
from schema import TodoCreate, TodoUpdate

# Get all todo items for a specific user
def get_todo_item_by_user_id(db: Session, user_id: int):
    """Get all todos for a specific user"""
    return db.query(Todo_items).filter(Todo_items.owner_id == user_id).all()

# Get todo item by id (with ownership verification)
def get_todo_item_by_id(db: Session, todo_item_id: int, user_id: int = None):
    """Get a specific todo item, optionally verify ownership"""
    query = db.query(Todo_items).filter(Todo_items.id == todo_item_id)
    if user_id is not None:
        query = query.filter(Todo_items.owner_id == user_id)
    return query.first()

# Create todo item
def create_todo_item(db: Session, todo_item: TodoCreate, user_id: int):
    """Create a new todo item for a user"""
    db_todo_item = Todo_items(
        title=todo_item.title,
        description=todo_item.description,
        completed=todo_item.completed,
        is_pinned=todo_item.is_pinned,
        owner_id=user_id
    )
    db.add(db_todo_item)
    db.commit()
    db.refresh(db_todo_item)
    return db_todo_item

# Update todo item
def update_todo_item(db: Session, todo_item_id: int, todo_item: TodoUpdate, user_id: int):
    """Update a todo item - verify ownership"""
    db_todo_item = get_todo_item_by_id(db, todo_item_id, user_id=user_id)
    if db_todo_item is None:
        raise HTTPException(status_code=404, detail="Todo item not found")
    
    # Update only provided fields
    if todo_item.title is not None:
        db_todo_item.title = todo_item.title
    if todo_item.description is not None:
        db_todo_item.description = todo_item.description
    if todo_item.completed is not None:
        db_todo_item.completed = todo_item.completed
    if todo_item.is_pinned is not None:
        db_todo_item.is_pinned = todo_item.is_pinned
    
    db.commit()
    db.refresh(db_todo_item)
    return db_todo_item

# Pin/unpin todo item
def pin_todo_item(db: Session, todo_item_id: int, user_id: int):
    """Toggle pin status - verify ownership"""
    db_todo_item = get_todo_item_by_id(db, todo_item_id, user_id=user_id)
    if db_todo_item is None:
        raise HTTPException(status_code=404, detail="Todo item not found")
    
    db_todo_item.is_pinned = not db_todo_item.is_pinned
    db.commit()
    db.refresh(db_todo_item)
    return db_todo_item

# Toggle complete status
def toggle_complete_todo_item(db: Session, todo_item_id: int, user_id: int):
    """Toggle completed status - verify ownership"""
    db_todo_item = get_todo_item_by_id(db, todo_item_id, user_id=user_id)
    if db_todo_item is None:
        raise HTTPException(status_code=404, detail="Todo item not found")
    
    db_todo_item.completed = not db_todo_item.completed
    db.commit()
    db.refresh(db_todo_item)
    return db_todo_item

# Delete todo item
def delete_todo_item(db: Session, todo_item_id: int, user_id: int):
    """Delete a todo item - verify ownership"""
    db_todo_item = get_todo_item_by_id(db, todo_item_id, user_id=user_id)
    if db_todo_item is None:
        raise HTTPException(status_code=404, detail="Todo item not found")
    
    db.delete(db_todo_item)
    db.commit()
    return db_todo_item
