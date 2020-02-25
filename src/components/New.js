import React, { useState, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import Form from './Form';
import { APIURL } from '../config';
import { UserContext } from '../UserContext';

function New() {
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
  const [createdId, setCreatedId] = useState(null);
  //Thanks, Jen!

  //gets value of each input field and updates the state of book
  const handleChange = function(event) {
    event.persist();
    const { name, value } = event.target;

    setBook({ ...book, [name]: value });
  };

  //makes POST request to the backend to add a book to the database
  function handleSubmit(event) {
    event.preventDefault();

    const url = `${APIURL}/books`;
    fetch(url, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${user.token}`
      },
      body: JSON.stringify(book)
    })
      .then(response => response.json())
      .then(data => {
        setCreatedId(data._id);
      })
      // Make sure to handle this case with some user feedback!
      .catch(console.log);
  }

  //if id was created successfully, redirect user back to homepage
  if (createdId) {
    return (
      <Redirect
        to={{
          pathname: '/books',
          state: {
            id: createdId
          }
        }}
      />
    );
  }

  //renders empty form for user to fill out
  return (
    <Form book={book} handleChange={handleChange} handleSubmit={handleSubmit} />
  );
}

export default New;
