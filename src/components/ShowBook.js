import React from 'react';
import { Link } from 'react-router-dom';


function ShowBook(props) {
  const currentBook = props.books.find(
    book => book.title === props.match.params.title
  );
  return (
    <div>
      <h3>{currentBook.title}</h3>
      <img src={currentBook.coverPhotoURL} alt={currentBook.title} />
      <p>{currentBook.author}</p>
      <p>{currentBook.synopsis}</p>
      <p>{currentBook.rating}</p>
      <p>{currentBook.review}</p>
      <a href={currentBook.amazonURL} target="_blank">
        Buy it on Amazon
      </a>
      <Link to={`/books/${currentBook._id}/edit`}>Edit</Link>
    </div>
  );
}

export default ShowBook;
