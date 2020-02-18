import React, { useState, useEffect } from 'react';
import Form from './Form'

function New() {
    const [book, setBook] = useState({});
    const [values, setValues] = useState({
        title: '',
        author: '',
        coverPhotoURL: '',
        amazonURL: '',
        synopsis: '',
        rating: '',
        review: '',
        readStatus: false
    });

    const handleChange = function (event) {
        const { name, value } = event.target;

        setValues({ ...values, [name]: value });
        console.log(values);
        const newBook = {
            title: values.title,
            author: values.author,
            coverPhotoURL: values.coverPhotoURL,
            amazonURL: values.amazonURL,
            synopsis: values.synopsis,
            rating: values.rating,
            review: values.review,
            readStatus: values.readStatus
        };
        setBook(JSON.stringify(newBook));
        console.log(newBook);
    };

    const addBook = async function (
        url = 'http://localhost:4000/books',
        data = book
    ) {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: data
        });
        return await response.json();
    };

    function handleSubmit(event) {
        event.preventDefault();
        addBook();
    }
    // if (values.title) {
    //     return <Redirect to={`/books/${values.title}`} />;
    // }

    return (
        <Form values={values} handleChange={handleChange} handleSubmit={handleSubmit}/>
    )
}

export default New;