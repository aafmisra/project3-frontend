import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import Form from './Form';

function Edit(props) {
  const url = `http://localhost:4000/books/${props.match.params.id}`;

  const [book, setBook] = useState();
  const [deleted, setDeleted] = useState(false);

  const [createdId, setCreatedId] = useState(null);
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
    return () => props.getBooks();
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
        'content-type': 'application/json; charset=UTF-8'
      },
      body: JSON.stringify(book)
    })
      .then(response => response.json())
      .then(data => {
        setCreatedId(data._id);
      })
      .catch(() => {
        setError(true);
      });
  }

  // deletes currentBook from ShowBook.js
  function deleteBook(event) {
    fetch(url, { method: 'DELETE' })
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
  if (createdId) {
    return <Redirect to={`/books/${createdId}`} />;
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
