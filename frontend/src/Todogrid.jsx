import React, { useState } from "react";

function TodoGrid() {
  // 1. State danh sách Todo
  const [todos, setTodos] = useState([]);

  // 2. State cho ô nhập liệu Todo
  const [inputValue, setInputValue] = useState("");

  // 3. State cho phần Ghi chú (Note) -> Đã thêm mới để tránh lỗi Crash
  const [note, setNote] = useState("");

     
  // --- CÁC HÀM XỬ LÝ (LOGIC) ---

  const handleAddTodo = () => {
    if (inputValue.trim() === "") return;

    const newTodo = {
      id: Date.now(),
      text: inputValue,
      isDone: false
    };

    setTodos([...todos, newTodo]);
    setInputValue("");
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleAddTodo();
    }
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
      )
    );
  };

  // Hàm Update: Hiện popup cho người dùng nhập tên mới
  const handleTodoUpdate = (id, oldText) => {
    const newText = prompt("Nhập nội dung công việc mới:", oldText);
    if (newText && newText.trim() !== "") {
        setTodos(
            todos.map((todo) =>
              todo.id === id ? { ...todo, text: newText } : todo
            )
        );
    }
  };
  const handlePinTodo = (id) => {
    setTodos(todos.map((todo) => todo.id === id ? { ...todo, isPinned: !todo.isPinned } : todo));
  };    


  return (
    <div className="todogrid">
      
      {/* CỘT TRÁI: TODO ITEMS (Bao gồm AddBar và List) */}
      {/* Quan trọng: Phải có div này thì CSS mới chia cột đúng */}
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

        {/* 2. Danh sách công việc */}
        <div className="list-container">
          {todos.map((todo) => (
            <div key={todo.id} className="todo-row" style={{backgroundColor: todo.isPinned ? "#ffcc00" : "white"}}>
              {/* Click vào tên để gạch chéo */}
              <span 
                onClick={() => toggleTodo(todo.id)} 
                style={{
                    textDecoration: todo.isDone ? "line-through" : "none",
                    cursor: "pointer",
                    flex: 1 // Đẩy các nút sang phải
                }}
              >
                {todo.text}
              </span>

              {/* Nhóm các nút thao tác */}
              <div style={{display: 'flex', gap: '5px'}}>
                  <button 
                    onClick={() => handleTodoUpdate(todo.id, todo.text)}
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