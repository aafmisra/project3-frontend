import React from 'react';
// import logo from './logo.svg';
import { Link, Switch, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <header>
        <h1>BookBear</h1>
        <Link to="/">Home</Link>
      </header>
      <Switch>
        <Route>{/* <Home /> */}</Route>
        <Route>{/* <ShowBook /> */}</Route>
      </Switch>
    </div>
  );
}

export default App;
