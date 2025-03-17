import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import './login.css'; 

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Logged in with email: ' + email);
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="username">
            <i className="fas fa-user"></i> Email
          </label>
          <input
            type="text"
            id="username"
            placeholder="name@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="input-group">
          <label htmlFor="password">
            <i className="fas fa-lock"></i> Password
          </label>
          <input
            type="password"
            id="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <a href="forgetpassword" className="forgot-password">
          Forgot password?
        </a>

        <button type="submit">
          <i className="fas fa-sign-in-alt"></i> <a href='./profile'>LOGIN</a>
        </button>
      </form>

      <div className="signup-section">
        <p>
          Or  <Link to="/register">Sign up here</Link>
        </p>
        <div className="social-icons">
          <a href="https://www.google.com">
            <i className="fab fa-google"></i>
          </a>
          <a href="https://www.facebook.com">
            <i className="fab fa-facebook"></i>
          </a>
          <a href="https://twitter.com">
            <i className="fab fa-twitter"></i>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
