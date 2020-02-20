import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import Form from './Form';

function New(props) {
  const [book, setBook] = useState({});
  const [createdId, setCreatedId] = useState(null);
  //Thanks, Jen!

  // only run getBooks when New unmounts (you
  // click submit)
  useEffect(() => {
    return () => props.getBooks();
  }, []);

  //gets value of each input field and updates the state of book
  const handleChange = function(event) {
    event.persist();
    const { name, value } = event.target;

    setBook({ ...book, [name]: value });
  };

  //makes POST request to the backend to add a book to the database
  function handleSubmit(event) {
    event.preventDefault();

    const url = 'http://localhost:4000/books';
    fetch(url, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(book)
    })
      .then(response => response.json())
      .then(data => {
        setCreatedId(data._id);
      });
  }

  //if id was created successfully, redirect user back to homepage
  if (createdId) {
    return <Redirect to="/books" />;
  }

  //renders empty form for user to fill out
  return (
    <Form book={book} handleChange={handleChange} handleSubmit={handleSubmit} />
  );
}

export default New;
