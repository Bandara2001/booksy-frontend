import React, { useEffect, useState } from "react";
import axios from "axios";
import Toast from "../components/Toast";
import { useNavigate } from "react-router-dom";
import "./EditBook.css";

function DeleteBookManual() {
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

  //Fetching Books from the backend
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

  //Updates the book state whenever a book is selected.
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

  //Confirms deletion with the user using window.confirm.
  const handleDelete = async (e) => {
    e.preventDefault();
    if (!selectedBookId) {
      alert("Please select a book to delete");
      return;
    }
    if (!window.confirm(`Are you sure you want to delete "${book.bookName}"?`)) {
      return;
    }
    try {
      await axios.delete(`http://localhost:5000/api/books/${selectedBookId}`);
      setToast("Book deleted successfully!");
      setBooks(books.filter((b) => b._id !== selectedBookId));
      setSelectedBookId("");
      setTimeout(() => navigate("/library"), 1500);
    } catch {
      alert("Error deleting book");
    }
  };

  if (loading) return <p>Loading books...</p>;

  return (
    <div className="edit-book-page">
      <div className="edit-book-container">
        <h1>Delete Book</h1>

        <label>
          Select Book to Delete:
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
          <form className="edit-book-form" onSubmit={handleDelete}>
            <label>
              Book Name
              <input name="bookName" value={book.bookName} readOnly />
            </label>

            <label>
              Author
              <input name="author" value={book.author} readOnly />
            </label>

            <label>
              Genre
              <input name="genre" value={book.genre} readOnly />
            </label>

            <label>
              Price (LKR)
              <input name="price" value={book.price} readOnly />
            </label>

            <label>
              Description
              <textarea name="description" value={book.description} readOnly />
            </label>

            <label>
              Cover Image URL
              <input name="coverImage" value={book.coverImage} readOnly />
            </label>

            <button className="button delete-button" type="submit">
              Delete Book
            </button>
          </form>
        )}

        {toast && <Toast message={toast} />}
      </div>
    </div>
  );
}

export default DeleteBookManual;
