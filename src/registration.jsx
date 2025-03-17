import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './registration.css';

const Registration = () => {
  const [emailValid, setEmailValid] = useState(false);
  const [email, setEmail] = useState('');

  const validateEmail = (e) => {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    const isValid = emailPattern.test(e.target.value);
    setEmailValid(isValid);
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Registered successfully');
  };

  return (
    <div className="registration-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="username">
            <i className="fas fa-user"></i> Username
          </label>
          <input type="text" id="username" placeholder="name" required />
        </div>

        <div className="input-group">
          <label htmlFor="email">
            <i className="fas fa-envelope"></i> Email
          </label>
          <input
            type="email"
            id="email"
            placeholder="name@gmail.com"
            value={email}
            onChange={validateEmail}
            required
          />
          <i
            id="email-icon"
            className={`email-icon ${emailValid ? 'valid' : 'invalid'}`}
          >
            {/* Statically grey envelope, changes to red or green after validation */}
            <i className={`fas fa-envelope ${emailValid ? 'valid-envelope' : 'invalid-envelope'}`}></i>
          </i>
        </div>

        <div className="input-group">
          <label htmlFor="password">
            <i className="fas fa-lock"></i> Password
          </label>
          <input type="password" id="password" placeholder="Type your password" required />
        </div>

        <div className="input-group">
          <label htmlFor="confirm-password">
            <i className="fas fa-lock"></i> Confirm Password
          </label>
          <input
            type="password"
            id="confirm-password"
            placeholder="Confirm your password"
            required
          />
        </div>

        <button type="submit">
          <i className="fas fa-user-plus"></i> REGISTER
        </button>
      </form>

      <div className="login-section">
        <p>
          Already have an account? <Link to="/login">Login here</Link>
        </p>
      </div>
    </div>
  );
};

export default Registration;
