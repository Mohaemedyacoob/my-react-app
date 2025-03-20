import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./registration.css";

const Registration = () => {
  const [emailValid, setEmailValid] = useState(false);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const validateEmail = (e) => {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    const isValid = emailPattern.test(e.target.value);
    setEmailValid(isValid);
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!emailValid) {
      alert("Invalid email format!");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    // Store user in localStorage
    localStorage.setItem("user", JSON.stringify({ username, email, password }));
    alert("Registration successful! You can now log in.");
    navigate("/login");
  };

  return (
    <div className="registration-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="username">
            <i className="fas fa-user"></i> Username
          </label>
          <input
            type="text"
            id="username"
            placeholder="Enter your name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
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
            className={`fas fa-envelope ${emailValid ? "valid-envelope" : "invalid-envelope"}`}
          ></i>
        </div>

        <div className="input-group">
          <label htmlFor="password">
            <i className="fas fa-lock"></i> Password
          </label>
          <input
            type="password"
            id="password"
            placeholder="Type your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="input-group">
          <label htmlFor="confirm-password">
            <i className="fas fa-lock"></i> Confirm Password
          </label>
          <input
            type="password"
            id="confirm-password"
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
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
