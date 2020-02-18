import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

function ShowBook(props) {
  const currentBook = props.books.find(

    book => book._id === props.match.params.id
  );

  useEffect(() => {
    props.getBooks();
  }, []);

  console.log(currentBook);

  if (currentBook) {
    return (
      <div className="oneBook">
        <img src={currentBook.coverPhotoURL} alt={currentBook.title} />
            <div className="bookInfo">
        <h3>{currentBook.title}</h3>

        <p>{currentBook.author}</p>
        <p>{currentBook.synopsis}</p>
        <p>{currentBook.rating}</p>
        <p>{currentBook.review}</p>
        <a href={currentBook.amazonURL} target="_blank">
          Buy it on Amazon
        </a>
        <Link to={`/books/${currentBook._id}/edit`}>Edit</Link>
            </div>

      </div>
    );
  } else {
    return <p>loading...</p>;
  }
}

export default ShowBook;
