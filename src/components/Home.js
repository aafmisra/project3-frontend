import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Home() {
  const [books, setBooks] = useState([]);

  function getBooks() {
    const url = `http://localhost:4000/books`;

    fetch(url)
      .then(res => res.json())
      .then(data => {
        setBooks(data);
        console.log(data);
      })
      .catch(console.error);
  }

  useEffect(() => {
    getBooks();
  }, []);

  return (
    <div>
      {books.map(book => (
        <div key={book._id}>
          <Link to="/">
            <img src={book.coverPhotoURL} alt={book.title} />
          </Link>
          <h3>{book.title}</h3>
          <p>{book.author}</p>
        </div>
      ))}
    </div>
  );
}

export default Home;
