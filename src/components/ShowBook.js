import React from 'react';

function ShowBook(props) {
  const currentBook = props.books.find(
    book => book.title === props.match.params.title
  );
  return (
    <div className="oneBook">
      <img src={currentBook.coverPhotoURL} alt={currentBook.title} />
      <div className="bookInfo">
      <h3>{currentBook.title}</h3>
      <p>by: {currentBook.author}</p>
      <p>{currentBook.synopsis}</p>
      <p>{currentBook.rating}</p>
      <p>{currentBook.review}</p>
      <a href={currentBook.amazonURL} target="_blank">
        Buy it on Amazon
      </a>
      </div>
    </div>
  );
}

export default ShowBook;
