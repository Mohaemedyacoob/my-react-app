import React, { useState, useEffect } from 'react';
import { FaPen } from 'react-icons/fa'; // Importing edit icon
import './profile.css';

const ProfilePage = () => {
  const [firstName, setFirstName] = useState('John');
  const [middleName, setMiddleName] = useState('Michael');
  const [lastName, setLastName] = useState('Doe');
  const [email, setEmail] = useState('john.doe@example.com');
  const [phone, setPhone] = useState('123-456-7890');
  const [gender, setGender] = useState('male');
  const [password, setPassword] = useState('password123');
  const [isEditing, setIsEditing] = useState(false);
  const [emailValid, setEmailValid] = useState(null);
  const [profilePic, setProfilePic] = useState(null); // Default profile image
  const [isSidebarMinimized, setIsSidebarMinimized] = useState(false);

  // Detect sidebar state and adjust layout
  useEffect(() => {
    const checkSidebar = () => {
      const sidebar = document.querySelector('.sidebar');
      setIsSidebarMinimized(sidebar && sidebar.classList.contains('minimized'));
    };

    checkSidebar(); // Initial check
    const observer = new MutationObserver(checkSidebar);
    const sidebarElement = document.querySelector('.sidebar');
    if (sidebarElement) {
      observer.observe(sidebarElement, { attributes: true, attributeFilter: ['class'] });
    }

    return () => observer.disconnect();
  }, []);

  // Handle profile picture change
  const handleProfileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePic(URL.createObjectURL(file));
    }
  };

  // Handle email validation
  const handleEmailChange = (e) => {
    const emailValue = e.target.value;
    setEmail(emailValue);
    const pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    setEmailValid(emailValue === '' ? null : pattern.test(emailValue));
  };

  // Handle profile save
  const handleSaveChanges = (e) => {
    e.preventDefault();
    if (emailValid === true) {
      alert('Profile updated successfully!');
      setIsEditing(false);
    } else {
      alert('Please enter a valid email.');
    }
  };

  return (
    <div
      className="profile-wrapper"
      style={{
        marginLeft: isSidebarMinimized ? '80px' : '270px',
        transition: 'margin-left 0.3s ease',
      }}
    >
      {/* Profile Picture Section */}
      <div className="profile-pic-container">
        <label htmlFor="profile-upload" className="profile-label">
          <img src={profilePic || require('./pr3.jpg')} alt="Profile" className="profile-pic" />
          <FaPen className="edit-icon" />
        </label>
        <input
          type="file"
          id="profile-upload"
          accept="image/*"
          onChange={handleProfileChange}
          style={{ display: 'none' }}
        />
        <p className="upload-hint">Profile</p>
      </div>

      {/* Profile Details Form */}
      <div className="homepage-container">
        <h2>Profile</h2>
        <form onSubmit={handleSaveChanges}>
          <div className="input-group">
            <label htmlFor="first-name">First Name</label>
            <input
              type="text"
              id="first-name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              disabled={!isEditing}
            />
          </div>

          <div className="input-group">
            <label htmlFor="middle-name">Middle Name</label>
            <input
              type="text"
              id="middle-name"
              value={middleName}
              onChange={(e) => setMiddleName(e.target.value)}
              disabled={!isEditing}
            />
          </div>

          <div className="input-group">
            <label htmlFor="last-name">Last Name</label>
            <input
              type="text"
              id="last-name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              disabled={!isEditing}
            />
          </div>

          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={handleEmailChange}
              disabled={!isEditing}
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="phone">Phone Number</label>
            <input
              type="text"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              disabled={!isEditing}
            />
          </div>

          <div className="input-group">
            <label htmlFor="gender">Gender</label>
            <select
              id="gender"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              disabled={!isEditing}
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={!isEditing}
              required
            />
          </div>

          {/* Edit & Save Buttons */}
          <div className="button-group">
            {isEditing ? (
              <button type="submit" className="save-button">Save</button>
            ) : (
              <button type="button" className="edit-button" onClick={() => setIsEditing(true)}>Edit</button>
            )}
          </div>
        </form>

        <p className="login-link">
          Want to go back to login? <a href="./Login">Login</a>
        </p>
      </div>
    </div>
  );
};

export default ProfilePage;
