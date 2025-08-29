import React from 'react';
import { useNavigate } from 'react-router-dom'; //React Router hook for programmatic navigation
import './Footer.css';

const Footer = () => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path); //doesnt repeat navigate
  };

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-logo">
          <a href="https://pagedone.io/" className="footer-logo-link">
            <svg
              className="footer-logo-svg"
              viewBox="0 0 164 33"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            > 
              {/* can add Logo paths */}
            </svg>
          </a>
        </div>

        <ul className="footer-links">
          <li>
            <button onClick={() => handleNavigation('/')} className="footer-link">
              Home
            </button>
          </li>
          <li>
            <button onClick={() => handleNavigation('/add')} className="footer-link">
              Add Book
            </button>
          </li>
          <li>
            <button onClick={() => handleNavigation('/edit')} className="footer-link">
              Edit Book
            </button>
          </li>
          <li>
            <button onClick={() => handleNavigation('/search')} className="footer-link">
              Search Books
            </button>
          </li>
          <li>
            <button onClick={() => handleNavigation('/delete')} className="footer-link">
              Delete Book
            </button>
          </li>
          <li>
            <button onClick={() => handleNavigation('/library')} className="footer-link">
              Library
            </button>
          </li>
          <li>
            <button onClick={() => handleNavigation('/profile')} className="footer-link">
              Profile
            </button>
          </li>
        </ul>

        <span className="footer-copyright">
  &copy; <a href="#" className="footer-link">Booksy</a> 2025, All rights reserved.
</span>

      </div>
    </footer>
  );
};

export default Footer;
