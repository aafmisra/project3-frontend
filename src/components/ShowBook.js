import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

function ShowBook(props) {
  const currentBook = props.books.find(
    book => book._id === props.match.params.id
  );

  //render all info for the selected book after it loads
  if (currentBook) {
    return (
      <div className="oneBook">
        <img src={currentBook.coverPhotoURL} alt={currentBook.title} />
        <div className="bookInfo">
          <h3>{currentBook.title}</h3>

          <p>Author: {currentBook.author}</p>
          <p>Synopsis: {currentBook.synopsis}</p>
          <p>Rating: {currentBook.rating}/5</p>
          <p>Review: {currentBook.review}</p>
          <a href={currentBook.amazonURL} target="_blank">
            Buy it on Amazon
          </a>
        </div>
      </div>
    );
  } else {
    return <p>loading...</p>;
  }
}

export default ShowBook;
