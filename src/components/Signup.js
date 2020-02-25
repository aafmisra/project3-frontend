import React, { useState } from 'react';
import { Redirect } from 'react-router-dom'; // This could also be done with the useHistory hook!
import AuthForm from './AuthForm';
import { APIURL } from '../config';

function SignUp() {
  const initialState = {
    name: '',
    email: '',
    password: ''
  };
  const url = `${APIURL}/signup`;
  const [credentials, setCredentials] = useState(initialState);
  const [redirect, setRedirect] = useState(null);
  const [error, setError] = useState(false);
  const handleChange = event => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  };
  const handleSubmit = event => {
    event.preventDefault();
    fetch(url, {
      method: 'POST',
      headers: {
        'content-type': 'application/json; charset=UTF-8'
      },
      body: JSON.stringify(credentials)
    })
      .then(res => res.json())
      .then(setRedirect)
      .catch(setError);
  };
  if (redirect) {
    return (
      <Redirect
        to={{
          pathname: '/signin',
          state: credentials // passing state allows us to prepopulate the signin form
        }}
      />
    );
  }
  return (
    <div>
      <h3>Sign Up</h3>
      {error && (
        <h4
          style={{
            color: 'white',
            background: 'red',
            padding: '1rem',
            position: 'relative',
            cursor: 'pointer',
            userSelect: 'none'
          }}
          onClick={() => setError(false)}
        >
          Sorry, something went wrong. Please try again!
          <span style={{ position: 'absolute', right: '.75rem', top: '.5rem' }}>
            ✕
          </span>
        </h4>
      )}
      <AuthForm
        credentials={credentials}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
    </div>
  );
}

export default SignUp;
