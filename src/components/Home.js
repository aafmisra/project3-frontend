import React from 'react';
import { Link } from 'react-router-dom';

function Home({ books }) {
  //iterate over list of all books and return cover, title, and author
  return (
    <div className="cardContainer">
      {books.map(book => (
        <div className="card" key={book._id}>
          <Link to={'/books/' + book._id}>
            <img
              src={book.coverPhotoURL}
              alt={book.title}
              className="homeBookCover"
            />
          </Link>
          <h3>{book.title}</h3>
          <p>{book.author}</p>
        </div>
      ))}
    </div>
  );
}

export default Home;
