import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../UserContext';
import { Link } from 'react-router-dom';
import { APIURL } from '../config';

function Home() {
  const { user } = useContext(UserContext);
  const [books, setBooks] = useState([]);
  const [error, setError] = useState(false);

  // useEffect will run any time there is a change in user!
  // If the user is not null, we get the books, if it is null
  // we'll clear the books.
  useEffect(() => {
    if (user) {
      const url = `${APIURL}/books`;
      fetch(url, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      })
        .then(res => res.json())
        .then(data => {
          setBooks(data);
        })
        .catch(() => {
          setError(true);
        });
    } else {
      setBooks([]);
    }
  }, [user]);

  if (!user) {
    return (
      <div className="cardContainer">
        <h1>Welcome to BookBear</h1>
        <p>
          <Link to="/signin">Login</Link> or <Link to="/signup">sign up</Link>{' '}
          for a free account to get started.
        </p>
      </div>
    );
  }
  return (
    <div className="cardContainer">
      {error && <div>Sorry, there was an error getting the books!</div>}
      {!error && !books.length ? (
        <>
          <h1>You don't have any books yet</h1>
          <p>Add some!</p>
        </>
      ) : (
        books.map(book => (
          <div className="card" key={book._id}>
            <Link to={'/books/' + book._id}>
              <img src={book.coverPhotoURL} alt={book.title} />
            </Link>
            <h3>{book.title}</h3>
            <p>{book.author}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default Home;
