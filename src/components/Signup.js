import React from 'react';

function SignUp() {
  return (
    <div>
      <h3>Sign Up</h3>
      <form>
        <label>Name:</label>
        <input name="name" value=""></input>
        <label>Email:</label>
        <input name="email" value=""></input>
        <label>Password:</label>
        <input name="password" value=""></input>
      </form>
    </div>
  );
}

export default SignUp;
