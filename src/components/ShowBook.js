import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../UserContext';
import { APIURL } from '../config';

function ShowBook({ match }) {
  const { user } = useContext(UserContext);
  const [book, setBook] = useState(null);
  const [error, setError] = useState(false);
  useEffect(() => {
    const url = `${APIURL}/books/${match.params.id}`;
    fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${user.token}`
      }
    })
      .then(res => res.json())
      .then(data => {
        setBook(data);
      })
      .catch(() => {
        setError(true);
      });
  }, [user, match]);
  if (!book) {
    return <div>Loading...</div>;
  }
  return (
    <div className="oneBook">
      {error && <p>Sorry something's gone wrong.</p>}
      {!error && book && (
        <>
          <img src={book.coverPhotoURL} alt={book.title} />
          <div className="bookInfo">
            <h3>{book.title}</h3>

            <p>Author: {book.author}</p>
            <p>Synopsis: {book.synopsis}</p>
            <p>Rating: {book.rating}/5</p>
            <p>Review: {book.review}</p>
            <a href={book.amazonURL} target="_blank">
              Buy it on Amazon
            </a>
          </div>
        </>
      )}
    </div>
  );
}

export default ShowBook;
