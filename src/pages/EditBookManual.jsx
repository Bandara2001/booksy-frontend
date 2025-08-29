import React, { useEffect, useState } from "react";
import axios from "axios";
import Toast from "../components/Toast";
import { useNavigate } from "react-router-dom";
import "./EditBook.css";

function EditBookManual() {
  const [books, setBooks] = useState([]);
  const [selectedBookId, setSelectedBookId] = useState("");
  const [book, setBook] = useState({
    bookName: "",
    author: "",
    description: "",
    genre: "",
    price: "",
    coverImage: "",
  });
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState("");
  const navigate = useNavigate();

  // Fetch all books from the backend
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/books");
        setBooks(res.data);
      } catch {
        alert("Failed to load books");
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, []);

  // Load selected book details on selection change
  useEffect(() => {
    if (!selectedBookId) {
      setBook({
        bookName: "",
        author: "",
        description: "",
        genre: "",
        price: "",
        coverImage: "",
      });
      return;
    }
    const selectedBook = books.find((b) => b._id === selectedBookId);
    if (selectedBook) setBook(selectedBook);
  }, [selectedBookId, books]);

  const handleChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  //Sends a PUT request to backend to update the selected book.
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedBookId) {
      alert("Please select a book to update");
      return;
    }
    try {
      await axios.put(`http://localhost:5000/api/books/${selectedBookId}`, book);
      setToast("Book updated successfully!");
      setTimeout(() => navigate("/library"), 1500);
    } catch {
      alert("Error updating book");
    }
  };

  if (loading) return <p>Loading books...</p>;

  return (
    <div className="edit-book-page">
      <div className="edit-book-container">
        <h1>Edit Book (Manual)</h1>

        <label>
          Select Book to Edit:
          <select
            value={selectedBookId}
            onChange={(e) => setSelectedBookId(e.target.value)}
          >
            <option value="">-- Select a book --</option>
            {books.map((b) => (
              <option key={b._id} value={b._id}>
                {b.bookName} by {b.author}
              </option>
            ))}
          </select>
        </label>

        {selectedBookId && (
          <form className="edit-book-form" onSubmit={handleSubmit}>
            <label>
              Book Name
              <input
                name="bookName"
                value={book.bookName}
                onChange={handleChange}
                placeholder="Book Name"
                required
              />
            </label>

            <label>
              Author
              <input
                name="author"
                value={book.author}
                onChange={handleChange}
                placeholder="Author"
                required
              />
            </label>

            <label>
              Genre
              <input
                name="genre"
                value={book.genre}
                onChange={handleChange}
                placeholder="Genre"
                required
              />
            </label>

            <label>
              Price (LKR)
              <input
                name="price"
                type="number"
                value={book.price}
                onChange={handleChange}
                placeholder="Price"
                required
              />
            </label>

            <label>
              Description
              <textarea
                name="description"
                value={book.description}
                onChange={handleChange}
                placeholder="Description"
                required
              />
            </label>

            <label>
              Cover Image URL
              <input
                name="coverImage"
                value={book.coverImage}
                onChange={handleChange}
                placeholder="Cover Image URL"
              />
            </label>

            <button className="button" type="submit">
              Edit Book
            </button>
          </form>
        )}

        {toast && <Toast message={toast} />}
      </div>
    </div>
  );
}

export default EditBookManual;
