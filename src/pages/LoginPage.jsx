import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";

const LoginPage = ({ isLoggedIn, setIsLoggedIn }) => {
  const [step, setStep] = useState(1);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleUsernameSubmit = () => {
    if (username.trim() === "") {
      setError("Please enter a username");
      return;
    }
    setError("");
    setStep(2);
  };

  const handleLogin = () => {
    if (username === "admin" && password === "12345") {
      setIsLoggedIn(true);
      setError("");
      setSuccess(true);
      // Clear sensitive info
      setUsername("");
      setPassword("");
      setStep(0); // Hide form
      // Optional: redirect to profile after a delay
      setTimeout(() => {
        navigate("/profile");
      }, 5000);
    } else {
      setError("Invalid username or password");
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setSuccess(false);
    setError("");
    setStep(1);
    navigate("/login");
  };

  if (isLoggedIn && step === 0) {
    // Show success message + logout button
    return (
      <div className="login-container">
        <h2>Successfully logged in!</h2>
        <button onClick={handleLogout} className="logout-button">Logout</button>
      </div>
    );
  }

  return (
    <div className="login-container">
      <h2>Admin Login</h2>

      {step === 1 && (
        <>
          <input
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <button onClick={handleUsernameSubmit}>Next</button>
        </>
      )}

      {step === 2 && (
        <>
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleLogin}>Login</button>
        </>
      )}

      {error && <p className="error">{error}</p>}
      {success && step !== 0 && <p className="success">Successfully logged in!</p>}
    </div>
  );
};

export default LoginPage;
