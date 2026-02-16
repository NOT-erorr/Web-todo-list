import React, { useState, useEffect } from "react";
import { api } from './api';

function TodoGrid() {
  // 1. State danh sách Todo
  const [todos, setTodos] = useState([]);

  // 2. State cho ô nhập liệu Todo
  const [inputValue, setInputValue] = useState("");

  // 3. State cho phần Ghi chú (Note)
  const [note, setNote] = useState("");
  
  // 4. Loading and error states
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Load todos from backend when component mounts
  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      setLoading(true);
      const data = await api.getTodos();
      setTodos(data);
    } catch (error) {
      console.error('Failed to fetch todos:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // --- CÁC HÀM XỬ LÝ (LOGIC) ---

  const handleAddTodo = async () => {
    if (inputValue.trim() === "") return;

    try {
      const newTodo = await api.createTodo(inputValue, "");
      setTodos([...todos, newTodo]);
      setInputValue("");
    } catch (error) {
      console.error('Failed to add todo:', error);
      setError(error.message);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleAddTodo();
    }
  };

  const deleteTodo = async (id) => {
    try {
      await api.deleteTodo(id);
      setTodos(todos.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error('Failed to delete todo:', error);
      setError(error.message);
    }
  };

  const toggleTodo = async (id) => {
    try {
      const updatedTodo = await api.toggleComplete(id);
      setTodos(
        todos.map((todo) =>
          todo.id === id ? updatedTodo : todo
        )
      );
    } catch (error) {
      console.error('Failed to toggle todo:', error);
      setError(error.message);
    }
  };

  // Hàm Update: Hiện popup cho người dùng nhập tên mới
  const handleTodoUpdate = async (id, oldTitle) => {
    const newTitle = prompt("Nhập nội dung công việc mới:", oldTitle);
    if (newTitle && newTitle.trim() !== "") {
      try {
        const updatedTodo = await api.updateTodo(id, { title: newTitle });
        setTodos(
          todos.map((todo) =>
            todo.id === id ? updatedTodo : todo
          )
        );
      } catch (error) {
        console.error('Failed to update todo:', error);
        setError(error.message);
      }
    }
  };

  const handlePinTodo = async (id) => {
    try {
      const updatedTodo = await api.togglePin(id);
      setTodos(
        todos.map((todo) =>
          todo.id === id ? updatedTodo : todo
        )
      );
    } catch (error) {
      console.error('Failed to pin todo:', error);
      setError(error.message);
    }
  };

  return (
    <div className="todogrid">
      
      {/* CỘT TRÁI: TODO ITEMS (Bao gồm AddBar và List) */}
      <div className="todoitems">
        
        {/* 1. Add Bar */}
        <div className="add-bar">
          <input 
            type="text" 
            placeholder="Add todo..." 
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button onClick={handleAddTodo}>+ Add</button>
        </div>

        {/* Error message */}
        {error && (
          <div style={{
            color: '#ff4d4d',
            fontSize: '14px',
            padding: '10px',
            textAlign: 'center'
          }}>
            {error}
          </div>
        )}

        {/* Loading message */}
        {loading && (
          <div style={{
            textAlign: 'center',
            padding: '20px',
            color: '#666'
          }}>
            Đang tải...
          </div>
        )}

        {/* 2. Danh sách công việc */}
        <div className="list-container">
          {todos.map((todo) => (
            <div key={todo.id} className="todo-row" style={{backgroundColor: todo.is_pinned ? "#ffcc00" : "white"}}>
              {/* Click vào tên để gạch chéo */}
              <span 
                onClick={() => toggleTodo(todo.id)} 
                style={{
                    textDecoration: todo.completed ? "line-through" : "none",
                    cursor: "pointer",
                    flex: 1 // Đẩy các nút sang phải
                }}
              >
                {todo.title}
              </span>

              {/* Nhóm các nút thao tác */}
              <div style={{display: 'flex', gap: '5px'}}>
                  <button 
                    onClick={() => handleTodoUpdate(todo.id, todo.title)}
                    style={{padding: '5px 10px', fontSize: '12px', background: '#ffa500'}}
                  >
                    Edit
                  </button>
                  <button 
                    onClick={() => deleteTodo(todo.id)}
                    style={{padding: '5px 10px', fontSize: '12px', background: '#ff4d4d'}}
                  >
                    Del
                  </button>
                  <button 
                    onClick={() => handlePinTodo(todo.id)}
                    style={{padding: '5px 10px', fontSize: '12px', background: '#8400ffff'}}
                  >
                    Pin
                  </button>
              </div>
            </div>
          ))} 
        </div>
      </div>

      {/* CỘT PHẢI: NOTE */}
      <div className="note">
        <h3>Note</h3>
        {/* Dùng Textarea thay cho input để gõ được nhiều dòng */}
        <textarea 
            placeholder="Ghi chú của bạn ở đây..."
            value={note}
            onChange={(e) => setNote(e.target.value)}
            style={{
                color: "#000000ff",
                width: "100%", 
                height: "90%", 
                padding: "10px", 
                border: "none", 
                outline: "none", 
                backgroundColor: "transparent", 
                resize: "none",
                fontSize: "16px",
                fontFamily: "Arial"
            }} 
        />
      </div>

    </div>
  );
}

export default TodoGrid;