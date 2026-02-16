// src/Login.jsx
import React, { useState } from 'react';
import './Login.css';
import { api } from './api';

const Login = ({ onLoginSuccess }) => {
  // State để chuyển đổi giữa Login và Signup
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const result = isLogin 
        ? await api.login(username, password)
        : await api.register(username, password);
      
      // Save token to localStorage
      localStorage.setItem('access_token', result.access_token);
      
      // Call parent callback to update app state
      onLoginSuccess();
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    // Xử lý login Google sau này
    alert("Chức năng đang phát triển: Login with Google");
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>{isLogin ? "Đăng Nhập" : "Đăng Ký"}</h2>
        
        <form onSubmit={handleSubmit}>
          {/* Nếu là Đăng ký thì hiện thêm ô Tên */}
          {!isLogin && (
            <div className="input-group">
              <label>Họ và tên</label>
              <input type="text" placeholder="Nguyễn Văn A" />
            </div>
          )}

          <div className="input-group">
            <label>Tên đăng nhập</label>
            <input 
              type="text" 
              placeholder="username" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required 
            />
          </div>

          <div className="input-group">
            <label>Mật khẩu</label>
            <input 
              type="password" 
              placeholder="••••••••" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
          </div>

          {/* Nếu là Đăng ký thì hiện thêm ô Nhập lại mật khẩu */}
          {!isLogin && (
            <div className="input-group">
              <label>Nhập lại mật khẩu</label>
              <input type="password" placeholder="••••••••" required />
            </div>
          )}

          {/* Error message */}
          {error && (
            <div style={{
              color: '#ff4d4d',
              fontSize: '14px',
              marginBottom: '10px',
              textAlign: 'center'
            }}>
              {error}
            </div>
          )}

          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? 'Đang xử lý...' : (isLogin ? "Đăng nhập" : "Đăng ký")}
          </button>
        </form>

        <div className="divider">
          <span>HOẶC</span>
        </div>

        <button className="btn-google" onClick={handleGoogleLogin}>
          {/* Logo Google lấy từ CDN cho nhanh */}
          <img 
            src="/OIP (3).webp" 
            alt="Google Logo" 
            width="20" 
          />
          {isLogin ? "Đăng nhập bằng Google" : "Đăng ký bằng Google"}
        </button>

        <div className="toggle-link">
          {isLogin ? "Chưa có tài khoản? " : "Đã có tài khoản? "}
          <span onClick={() => {
            setIsLogin(!isLogin);
            setError('');
            setUsername('');
            setPassword('');
          }}>
            {isLogin ? "Đăng ký ngay" : "Đăng nhập ngay"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login;