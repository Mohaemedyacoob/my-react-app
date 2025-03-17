import React, { useState } from 'react';
import { FaEdit } from 'react-icons/fa'; // Import edit icon
import './profile.css'; 

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState({
    firstName: 'md',
    lastName: '',
    middleName: 'yacoob',
    gender: 'male',
    phone: '9325554247',
    email: 'md@gmail.com',
    password: '********',
  });

  const [profilePic, setProfilePic] = useState("pr3.png"); // Default profile image

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfilePic(imageUrl);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsEditing(false);
    alert('Profile updated successfully!');
  };

  return (
    <div className="profile-container">
      <div className="profile-sidebar">
        <div className="profile-pic-wrapper">
          <img src={profilePic} alt="Profile" className="profile-pic" />
          <label htmlFor="file-input" className="edit-icon">
            <FaEdit />
          </label>
          <input 
            id="file-input"
            type="file" 
            accept="image/*" 
            onChange={handleImageChange} 
            className="file-input"
          />
        </div>
        <h3>{user.firstName} {user.lastName}</h3>
        <button className="public-profile-btn">View Public Profile</button>
      </div>
      <div className="profile-content">
        <div className="tabs">
          <span className="active">Account</span>
        </div>
        <form className="profile-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <label>First Name</label>
            <input
              type="text"
              name="firstName"
              value={user.firstName}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>
          <div className="input-group">
            <label>Last Name</label>
            <input
              type="text"
              name="lastName"
              value={user.lastName}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>
          <div className="input-group">
            <label>Middle Name</label>
            <input
              type="text"
              name="middleName"
              value={user.middleName}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>
          <div className="input-group">
            <label>Gender</label>
            <select name="gender" value={user.gender} onChange={handleChange} disabled={!isEditing}>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
          <div className="input-group">
            <label>Phone Number</label>
            <input
              type="tel"
              name="phone"
              value={user.phone}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>
          <div className="input-group">
            <label>Email Address</label>
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>
          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={user.password}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>
          <button type="button" onClick={() => setIsEditing(!isEditing)}>
            {isEditing ? 'Cancel' : 'Edit'}
          </button>
          {isEditing && <button type="submit">Save</button>}
        </form>
      </div>
    </div>
  );
};

export default Profile;
