import React, { useState } from "react";
import "./SearchBook.css";

function SearchBook() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`http://localhost:5000/api/books/search?q=${encodeURIComponent(query)}`);
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Status: ${response.status}, Message: ${errorText}`);
      }
      const data = await response.json();
      setResults(data);
    } catch (err) {
      console.error("Search failed:", err);
      setError(err.message || "Something went wrong while searching. Please try again.");
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="search-book-container">
      <h2>Search Books</h2>
      <form onSubmit={handleSearch} className="search-book-form">
        <input
          type="text"
          placeholder="Enter book name"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? "Searching..." : "Search"}
        </button>
      </form>

      <div className="search-results">
        {error && <p className="error">{error}</p>}
        {!error && results.length === 0 && !loading && <p>No results found.</p>}
        {!error && results.length > 0 && (
          <ul>
            {results.map((book) => (
              <li key={book._id} className="book-item">
                <h3>{book.bookName}</h3>
                <p><strong>Author:</strong> {book.author || "Unknown"}</p>
                <p><strong>Genre:</strong> {book.genre || "N/A"}</p>
                <p><strong>Description:</strong> {book.description || "N/A"}</p>
                <p><strong>Price:</strong> LKR {book.price ?? "N/A"}</p>
                {book.coverImage && (
                  <img
                    src={book.coverImage}
                    alt={book.bookName}
                    className="book-cover"
                  />
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default SearchBook;
