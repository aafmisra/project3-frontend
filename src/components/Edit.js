import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import Form from './Form';

function Edit(props) {
  const currentBook = props.books.find(
    book => book._id === props.match.params.id
  );
  // console.log(currentBook)

  const [book, setBook] = useState({});
  const [deleted, setDeleted] = useState(false);
  const [createdId, setCreatedId] = useState(null); //Thanks, Jen!
  const [values, setValues] = useState({
    title: currentBook.title,
    author: currentBook.author,
    coverPhotoURL: currentBook.coverPhotoURL,
    amazonURL: currentBook.amazonURL,
    synopsis: currentBook.synopsis,
    rating: currentBook.rating,
    review: currentBook.review,
    readStatus: currentBook.readStatus
  });

  // only run getBooks when Edit unmounts (every time
  // you leave)
  useEffect(() => {
    return () => props.getBooks();
  }, []);

  const handleChange = function(event) {
    const { name, value } = event.target;

    setValues({ ...values, [name]: value });
    console.log(values);
    const updatedBook = {
      title: values.title,
      author: values.author,
      coverPhotoURL: values.coverPhotoURL,
      amazonURL: values.amazonURL,
      synopsis: values.synopsis,
      rating: values.rating,
      review: values.review,
      readStatus: values.readStatus
    };
    //last character gets dropped, need to come back to this!
    setBook(JSON.stringify(updatedBook));
    console.log(updatedBook);
  };

  function updateBook() {
    const url = `http://localhost:4000/books/${currentBook._id}/edit`;

    fetch(url, {
      method: 'PUT',
      headers: {
        'content-type': 'application/json; charset=UTF-8'
      },
      body: book
    })
      .then(response => response.json())
      .then(data => {
        setCreatedId(data._id);
      });
  }

  function handleSubmit(event) {
    event.preventDefault();
    updateBook();
  }

  function deleteBook(event) {
    const url = `http://localhost:4000/books/${currentBook._id}`;
    fetch(url, { method: 'DELETE' })
      .then(res => {
        setDeleted(true);
      })
      .catch(console.error);
  }

  if (deleted) {
    return <Redirect to="/books" />;
  }

  if (createdId) {
    return <Redirect to={`/books/${currentBook._id}`} />;
  }

  return (
    <>
      <Form
        values={values}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
      <button onClick={deleteBook}>Delete Book</button>
    </>
  );
}

export default Edit;
