import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../UserContext';
import { Redirect } from 'react-router-dom';
import Form from './Form';
import { APIURL } from '../config';

function Edit({ match }) {
  const url = `${APIURL}/books/${match.params.id}`;
  const initialState = {
    title: '',
    author: '',
    coverPhotoURL: '',
    amazonURL: '',
    synopsis: '',
    rating: 3,
    review: '',
    readState: ''
  };
  const { user } = useContext(UserContext);
  const [book, setBook] = useState(initialState);
  const [deleted, setDeleted] = useState(false);
  const [edited, setEdited] = useState(null);
  const [error, setError] = useState(false); //Thanks, Jen!

  // only run getBooks when Edit unmounts (you hit
  // submit or delete)
  //fetch the book we want to edit and set it to the state of book, so the inputs render already filled in
  useEffect(() => {
    fetch(url)
      .then(response => response.json())
      .then(setBook)
      .catch(() => {
        setError(true);
      });
  }, []);

  //gets value of each input field and updates the state of book
  const handleChange = function(event) {
    event.persist();
    const { name, value } = event.target;

    setBook({ ...book, [name]: value });
  };

  //makes PUT request to the backend to update a book in the database
  function handleSubmit(event) {
    event.preventDefault();

    fetch(url + '/edit', {
      method: 'PUT',
      headers: {
        'content-type': 'application/json; charset=UTF-8',
        Authorization: `Bearer ${user.token}`
      },
      body: JSON.stringify(book)
    })
      .then(response => response.json())
      .then(data => {
        setEdited(data._id);
      })
      .catch(() => {
        setError(true);
      });
  }

  // deletes currentBook from ShowBook.js
  function deleteBook(event) {
    fetch(url, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${user.token}` }
    })
      // when running deleteBook, will make a boolean
      // to be checked
      .then(res => {
        setDeleted(true);
      })
      .catch(console.error);
  }

  // goes to home page if book was deleted
  if (deleted) {
    return <Redirect to="/books" />;
  }

  // goes back to ShowBook if book was updated
  if (edited) {
    return <Redirect to={`/books/${edited}`} />;
  }

  //returns error message if component doesn't update
  if (error) {
    return <div>Sorry, there was a problem updating the book</div>;
  }

  return (
    <>
      <Form
        book={book}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
      <button onClick={deleteBook}>Delete Book</button>
    </>
  );
}

export default Edit;
