// src/App.jsx
import React, { useState, useEffect } from 'react';
import './App.css'
import Sidebar from './Sidebar';
import TodoGrid from './Todogrid';
import Login from './Login';

function App() {
  const [isLogin, setIsLogin] = useState(false);
  // Move ALL hooks to the top - before any conditional returns
  const [activeButton, setActiveButton] = useState("Home");

  // Check if user has token on mount
  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (token) {
      setIsLogin(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    setIsLogin(false);
  };

  if (!isLogin) {
    return <Login onLoginSuccess={() => setIsLogin(true)} />;
  }
  
  
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