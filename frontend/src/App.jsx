// src/App.jsx
import React, { useState } from 'react';
import './App.css'
import Sidebar from './Sidebar';
import TodoGrid from './Todogrid';
import Login from './Login';
function App() {
  
  const [isLogin, setIsLogin] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Sau này sẽ gọi API FastAPI ở đây
    // Tạm thời giả lập đăng nhập thành công    
    onLoginSuccess(); 
  };

  const handleGoogleLogin = () => {
    // Xử lý login Google sau này
    alert("Chức năng đang phát triển: Login with Google");
    onLoginSuccess();
  };
  if (!isLogin) {
    return <Login 
      onLoginSuccess={() => setIsLogin(true)}
    />;
  }
  // trạng thái active của sidebar
  const [activeButton, setActiveButton] = useState("Home");
  const handleLogout = () => {
    setActiveButton("Logout");
  };
  const handleProfile = () => {
    setActiveButton("profile");
  };
  const handleHome = () => {
    setActiveButton("Home");
  };
  
  return (
    <div className="app-container">
       {/* 1. SIDEBAR */}
      <Sidebar />

      {/* 2. MAIN CONTENT */}
      <div className="main-content">
        
        {/* A. HEADER */}
        <div className="header">
          <h2 style={{color: '#000000ff'}}>My Todo List</h2>
          <div className="profile-group" 
              style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
             <span style={{color: '#000000ff'}}>Quoc Long</span>
             <div className="profile-icon">
              <img alt="" src="/11zon_cropped (2).png"/>
             </div>
          </div>
        </div>

        {/* B. TODO GRID (Chứa Items và Note) */}
        <TodoGrid />
      </div>
    </div>
  )
}

export default App