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

  const handleChange = function(event) {
    event.persist();
    const { name, value } = event.target;

    setBook({ ...book, [name]: value });
  };

  function addBook() {
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

  function handleSubmit(event) {
    event.preventDefault();
    addBook();
  }

  if (createdId) {
    return <Redirect to="/books" />;
  }

  return (
    <Form book={book} handleChange={handleChange} handleSubmit={handleSubmit} />
  );
}

export default New;
