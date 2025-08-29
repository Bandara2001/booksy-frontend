import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar({ isLoggedIn, setIsLoggedIn }) {
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const navigate = useNavigate();

  //show or hide a navbar based on the scroll direction.
  const controlNavbar = () => {
    if (window.scrollY > lastScrollY) {
      setShowNavbar(false); // if scroll down hide the navbar
    } else {
      setShowNavbar(true);
    }
    setLastScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", controlNavbar);
    return () => window.removeEventListener("scroll", controlNavbar); //On scroll, controlNavbar is called to hide/show the navbar.
  }, [lastScrollY]); 

  const handleLogout = () => {
    setIsLoggedIn(false);
    navigate("/"); // Redirect to home after logout
  };

  return (
    <nav className={`navbar ${showNavbar ? "visible" : "hidden"}`}>
      <div className="navbar-left">
        <img
          src="https://cdn-icons-png.flaticon.com/512/29/29302.png"
          alt="Booksy"
          className="navbar-logo"
        />
        <span className="navbar-title">Booksy</span>
      </div>
      <div className="navbar-links">
        <Link to="/" className="navbar-link">Home</Link>
        <Link to="/add" className="navbar-link">Add Book</Link>
        <Link to="/edit" className="navbar-link">Edit Book</Link>
        <Link to="/search" className="navbar-link">Search Book</Link>
        <Link to="/delete" className="navbar-link">Delete Book</Link>
        <Link to="/library" className="navbar-link">Library</Link>
        <Link to="/profile" className="navbar-link">Profile</Link>

        {isLoggedIn ? (
          <button
            className="navbar-link logout-button"
            onClick={handleLogout}
            style={{
              background: "none",
              border: "none",
              color: "white",
              cursor: "pointer",
              fontSize: "1rem",
              padding: 0,
              marginLeft: "10px",
            }}
          >
            Logout
          </button>
        ) : (
          <Link to="/login" className="navbar-link">Login</Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
