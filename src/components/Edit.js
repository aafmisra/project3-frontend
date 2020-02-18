import React, { useState, useEffect } from 'react';
import Form from './Form'

function Edit(props) {
    const currentBook = props.books.find(
        book => book.title === props.match.params.title);


    const [book, setBook] = useState({});
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

    const handleChange = function (event) {
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
        setBook(JSON.stringify(updatedBook));
        console.log(updatedBook);
    };

    const updateBook = async function (
        url = 'http://localhost:4000/books',
        data = book
    ) {
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: data
        });
        return await response.json();
    };

    function handleSubmit(event) {
        event.preventDefault();
        updateBook();
    }
    // if (values.title) {
    //     return <Redirect to={`/books/${values.title}`} />;
    // }

    return (
        <Form values={values} handleChange={handleChange} handleSubmit={handleSubmit} />
    )
}

export default Edit;