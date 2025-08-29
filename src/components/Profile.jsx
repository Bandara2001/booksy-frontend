import React from "react";
import { useNavigate } from "react-router-dom";
import "./Profile.css";

const Profile = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();

  const adminDetails = {
    name: "Oshini Bandara",
    email: "oshinibandara@gmail.com",
    avatar: "https://thumbs.dreamstime.com/b/print-354138772.jpg",
  };

  const handleLogout = () => {
    setIsLoggedIn(false); // reset login state
    navigate("/");        // redirect to Home page
  };

  return (
    <div className="profile-container">
      <div className="profile-card">
        <img
          src={adminDetails.avatar}
          alt="Admin Avatar"
          className="profile-avatar"
        />
        <h2 className="profile-name">{adminDetails.name}</h2>
        <p className="profile-email">{adminDetails.email}</p>

        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;
