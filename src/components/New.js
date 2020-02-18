import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import Form from './Form'

function New() {
    const [book, setBook] = useState({});
    const [createdId, setCreatedId] = useState(null); //Thanks, Jen!
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
        event.persist();
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

    function addBook() {
        const url = 'http://localhost:4000/books'
        fetch(url, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: book
        })
        .then(response => response.json())
        .then(data => {
            setCreatedId(data._id);
        });
    };

    function handleSubmit(event) {
        event.preventDefault();
        addBook();
    }

    if (createdId) {
        return <Redirect to='/books' />;
    }

    return (
        <Form values={values} handleChange={handleChange} handleSubmit={handleSubmit}/>
    )
}

export default New;