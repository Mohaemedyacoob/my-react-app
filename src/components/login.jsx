import { Link, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import './login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (storedUser && email === storedUser.email && password === storedUser.password) {
      alert("Login successful!");
      localStorage.setItem("authToken", "sample_token");
      navigate("/profile");
    } else {
      alert("Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="email">
            <i className="fas fa-user"></i> Email
          </label>
          <input
            type="email"
            id="email"
            placeholder="name@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="input-group password-group">
          <label htmlFor="password">
            <i className="fas fa-lock"></i> Password
          </label>
          <div className="password-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <i 
              className={`fas ${showPassword ? "fa-eye-slash" : "fa-eye"}`} 
              onClick={() => setShowPassword(!showPassword)}
            ></i>
          </div>
        </div>

        <Link to="/forgetpassword" className="forgot-password">
          Forgot password?
        </Link>

        <button type="submit">
          <i className="fas fa-sign-in-alt"></i> LOGIN
        </button>
      </form>

      <div className="signup-section">
        <p>
          Or <Link to="/register">Sign up here</Link>
        </p>
        <div className="social-icons">
          <a href="https://www.google.com" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-google"></i>
          </a>
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-facebook"></i>
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-twitter"></i>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
