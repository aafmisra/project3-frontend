import React, { useState, useEffect } from 'react';

function Form({ values, handleSubmit, handleChange }) {
  return (
    <div>
      <h3>Add a book</h3>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title:</label>
        <input
          name="title"
          id="title"
          onChange={handleChange}
          value={values.title}
        />
        <label htmlFor="author">Author:</label>
        <input
          name="author"
          id="author"
          onChange={handleChange}
          value={values.author}
        />
        <label htmlFor="coverPhotoURL">Cover Image URL:</label>
        <input
          name="coverPhotoURL"
          id="coverPhotoURL"
          onChange={handleChange}
          value={values.coverPhotoURL}
        />
        <label htmlFor="amazonURL">Amazon Link URL:</label>
        <input
          name="amazonURL"
          id="amazonURL"
          onChange={handleChange}
          value={values.amazonURL}
        />
        <label htmlFor="synopsis">Synopsis:</label>
        <textarea
          name="synopsis"
          id="synopsis"
          cols="50"
          rows="5"
          onChange={handleChange}
          value={values.synopsis}
        />
        <label htmlFor="rating">Rating:</label>
        <input
          name="rating"
          id="rating"
          onChange={handleChange}
          value={values.rating}
        />
        <label htmlFor="review">Review:</label>
        <textarea
          name="review"
          id="review"
          cols="50"
          rows="5"
          onChange={handleChange}
          value={values.review}
        />
        <label htmlFor="readStatus">I'read this one</label>
        <input type="checkbox" name="readStatus" />
        <input type="submit" />
      </form>
    </div>
  );
}

export default Form;
