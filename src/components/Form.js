import React from 'react';


function Form({ book, handleSubmit, handleChange }) {
  if (!book) {
    return null;
  }
  return (
    <div>
      <h3>Add a book</h3>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title:</label>
        <input
          name="title"
          id="title"
          onChange={handleChange}
          value={book.title}
        />
        <label htmlFor="author">Author:</label>
        <input
          name="author"
          id="author"
          onChange={handleChange}
          value={book.author}
        />
        <label htmlFor="coverPhotoURL">Cover Image URL:</label>
        <input
          name="coverPhotoURL"
          id="coverPhotoURL"
          onChange={handleChange}
          value={book.coverPhotoURL}
        />
        <label htmlFor="amazonURL">Amazon Link URL:</label>
        <input
          name="amazonURL"
          id="amazonURL"
          onChange={handleChange}
          value={book.amazonURL}
        />
        <label htmlFor="synopsis">Synopsis:</label>
        <textarea
          name="synopsis"
          id="synopsis"
          cols="50"
          rows="5"
          onChange={handleChange}
          value={book.synopsis}
        />
        <label htmlFor="rating">Rating:</label>
        <input
          type="number"
          min="0"
          max="5"
          name="rating"
          id="rating"
          onChange={handleChange}
          value={book.rating}
        />
        <label htmlFor="review">Review:</label>
        <textarea
          name="review"
          id="review"
          cols="50"
          rows="5"
          onChange={handleChange}
          value={book.review}
        />
        <label htmlFor="readStatus">I'read this one</label>
        {/* update when user model is implemented: <input type="checkbox" name="readStatus" /> */}
        <input type="submit" />
      </form>
    </div>
  );
}

export default Form;
