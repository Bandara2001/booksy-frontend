import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import AddBook from "./pages/AddBook";
import EditBook from "./pages/EditBook";
import SearchBook from "./pages/SearchBook";
import Library from "./pages/Library";
import EditBookManual from "./pages/EditBookManual";
import DeleteBookManual from "./pages/DeleteBookManual";
import LoginPage from "./pages/LoginPage";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Profile from "./components/Profile";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Component to show "Please login first" message
  const RequireLogin = ({ children }) => {
    return isLoggedIn ? (
      children
    ) : (
      <p style={{ textAlign: "center", padding: "50px", color: "red" }}>
        Please login first to access this page.
      </p>
    );
  };

  return (
    <Router>
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <main style={{ minHeight: "80vh" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/library" element={<Library />} />

          {/* AddBook page for testing: always logged in */}
          <Route path="/add" element={<AddBook isLoggedIn={true} />} />

          {/* Other protected pages */}
          <Route
            path="/edit/:id"
            element={
              <RequireLogin>
                <EditBook isLoggedIn={isLoggedIn} />
              </RequireLogin>
            }
          />
          <Route
            path="/edit"
            element={
              <RequireLogin>
                <EditBookManual isLoggedIn={isLoggedIn} />
              </RequireLogin>
            }
          />
          <Route
            path="/search"
            element={
              <RequireLogin>
                <SearchBook isLoggedIn={isLoggedIn} />
              </RequireLogin>
            }
          />
          <Route
            path="/delete"
            element={
              <RequireLogin>
                <DeleteBookManual isLoggedIn={isLoggedIn} />
              </RequireLogin>
            }
          />

          {/* Login Page */}
          <Route
            path="/login"
            element={<LoginPage isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />}
          />

          {/* Profile Page */}
          <Route
            path="/profile"
            element={
              isLoggedIn ? (
                <Profile setIsLoggedIn={setIsLoggedIn} />
              ) : (
                <p style={{ textAlign: "center", padding: "50px", color: "red" }}>
                  Please log in to access the profile page.
                </p>
              )
            }
          />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
