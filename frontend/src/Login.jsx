// src/Login.jsx
import React, { useState } from 'react';
import './Login.css';

const Login = ({ onLoginSuccess }) => {
  // State để chuyển đổi giữa Login và Signup
  const [isLogin, setIsLogin] = useState(true);

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

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>{isLogin ? "Đăng Nhập" : "Đăng Ký"}</h2>
        
        <form onSubmit={handleSubmit}>
          {/* Nếu là Đăng ký thì hiện thêm ô Tên */}
          {!isLogin && (
            <div className="input-group">
              <label>Họ và tên</label>
              <input type="text" placeholder="Nguyễn Văn A" required />
            </div>
          )}

          <div className="input-group">
            <label>Email</label>
            <input type="email" placeholder="name@example.com" required />
          </div>

          <div className="input-group">
            <label>Mật khẩu</label>
            <input type="password" placeholder="••••••••" required />
          </div>

          {/* Nếu là Đăng ký thì hiện thêm ô Nhập lại mật khẩu */}
          {!isLogin && (
            <div className="input-group">
              <label>Nhập lại mật khẩu</label>
              <input type="password" placeholder="••••••••" required />
            </div>
          )}

          <button type="submit" className="btn-primary">
            {isLogin ? "Đăng nhập" : "Đăng ký"}
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
          <span onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? "Đăng ký ngay" : "Đăng nhập ngay"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login;