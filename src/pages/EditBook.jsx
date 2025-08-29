import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Toast from "../components/Toast";
import "./EditBook.css";

function EditBook() {
  const [book, setBook] = useState({
    bookName: "",
    author: "",
    description: "",
    genre: "",
    price: "",
    coverImage: ""
  });
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  //Fetches a single book by ID from the backend.
  useEffect(() => {
    console.log("Fetching book with ID:", id);
    const fetchBook = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/books/${id}`);
        console.log("Book data:", res.data);
        setBook(res.data);
      } catch (err) {
        console.error("Error fetching book:", err);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchBook();
  }, [id]);

  if (loading) return <p>Loading book details...</p>;

  const handleChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting updated book data:", book);
    try {
      await axios.put(`http://localhost:5000/api/books/${id}`, book);
      console.log("Update successful");
      setToast("Book updated successfully!");
      setTimeout(() => navigate("/library"), 1500);
    } catch (err) {
      console.error("Error updating book:", err);
    }
  };

  return (
    <div className="edit-book-page">
      <div className="edit-book-container">
        <h1>Edit Book</h1>
        {toast && <Toast message={toast} />}
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
      </div>
    </div>
  );
}

export default EditBook;
