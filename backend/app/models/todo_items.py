from sqlalchemy import Column, Integer, String, Boolean, ForeignKey
from sqlalchemy.orm import relationship
from .database import Base

class Todo_items(Base):
    __tablename__ = 'todo_items'
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String)
    description = Column(String)
    completed = Column(Boolean, default=False)
    owner_id = Column(Integer, ForeignKey('users.id'))
    is_pinned = Column(Boolean, default=False)
    
    # Relationship
    owner = relationship("User", back_populates="todos")