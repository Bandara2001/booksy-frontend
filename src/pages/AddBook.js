import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Toast from "../components/Toast";
import "./AddBook.css";

function AddBook({ isLoggedIn }) {
  const [book, setBook] = useState({
    bookName: "",
    author: "",
    description: "",
    genre: "",
    price: "",
    coverImage: ""
  });

  const [toast, setToast] = useState(""); // Stores error message
  const navigate = useNavigate();

  const handleChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/books", book);
      navigate("/library");
    } catch (error) {
      setToast("Failed to add book. Please try again.");
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="add-book-page">
        <h2 style={{ textAlign: "center", marginTop: "50px", color: "red" }}>
          Please login first to access this page.
        </h2>
      </div>
    );
  }

  return (
    <div className="add-book-page">
      <div className="add-book-container">
        <h2>Add New Book</h2>
        {toast && <Toast message={toast} />}
        <form className="add-book-form" onSubmit={handleSubmit}>
          <label>
            Book Name
            <input
              name="bookName"
              placeholder="Book Name"
              onChange={handleChange}
              required
              autoComplete="off"
              data-testid="bookName"
              style={{ marginBottom: "10px" }}
            />
          </label>
          <label>
            Author
            <input
              name="author"
              placeholder="Author"
              onChange={handleChange}
              required
              autoComplete="off"
              data-testid="author"
              style={{ marginBottom: "10px" }}
            />
          </label>
          <label>
            Genre
            <input
              name="genre"
              placeholder="Genre"
              onChange={handleChange}
              required
              autoComplete="off"
              data-testid="genre"
              style={{ marginBottom: "10px" }}
            />
          </label>
          <label>
            Price (LKR)
            <input
              name="price"
              type="number"
              placeholder="Price (LKR)"
              onChange={handleChange}
              required
              data-testid="price"
              style={{ marginBottom: "10px" }}
            />
          </label>
          <label>
            Description
            <textarea
              name="description"
              placeholder="Description"
              onChange={handleChange}
              required
              data-testid="description"
              style={{ marginBottom: "10px" }}
            />
          </label>
          <label>
            Cover Image URL
            <input
              name="coverImage"
              placeholder="Cover Image URL"
              onChange={handleChange}
              autoComplete="off"
              data-testid="coverImage"
              style={{ marginBottom: "10px" }}
            />
          </label>
          <button type="submit" data-testid="submitButton">
            Add Book
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddBook;
