import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Library.css";

function Library() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/books");
      setBooks(res.data);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch books");
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this book?"
    );
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:5000/api/books/${id}`);
      // Remove deleted book from state to update UI instantly
      setBooks((prevBooks) => prevBooks.filter((book) => book._id !== id));
    } catch (err) {
      alert("Failed to delete book.");
    }
  };

  if (loading) return <p>Loading books...</p>;
  if (error) return <p>{error}</p>;
  if (books.length === 0) return <p>No books found in the library.</p>;

  // Group books by genre
  const groupedBooks = books.reduce((groups, book) => {
    const genre = book.genre || "Others";
    if (!groups[genre]) groups[genre] = [];
    groups[genre].push(book);
    return groups;
  }, {});

  return (
    <div className="library-page">
      <h1>Library</h1>
      {Object.keys(groupedBooks).map((genre) => (
        <div key={genre} className="genre-section">
          <h2>{genre}</h2>
          <div className="book-list">
            {groupedBooks[genre].map((book) => (
              <div key={book._id} className="book-card">
                <img src={book.coverImage} alt={book.bookName} />
                <h3>{book.bookName}</h3>
                <p>By {book.author}</p>
                <p>{book.description}</p>
                <p>Price: LKR {book.price}</p>
                <Link to={`/edit/${book._id}`}>
                  <button className="edit-button">Edit</button>
                </Link>
                <button
                  className="delete-button"
                  onClick={() => handleDelete(book._id)}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Library;
