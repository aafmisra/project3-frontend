import React, { useState, useEffect } from 'react';
// import logo from './logo.svg';
import Home from './components/Home';
import New from './components/New'
import { Link, Switch, Route } from 'react-router-dom';
import ShowBook from './components/ShowBook';

function App() {
  const [books, setBooks] = useState([]);

  function getBooks() {
    const url = `http://localhost:4000/books`;

    fetch(url)
      .then(res => res.json())
      .then(data => {
        setBooks(data);
        console.log(data);
      })
      .catch(console.error);
  }

  useEffect(() => {
    getBooks();
  }, []);

  return (
    <div className="App">
      <header>
        <Link to="/books"><h1>BookBear</h1></Link>
        <Link to="/new">Add a book</Link>
      </header>
      <Switch>
        <Route exact path="/books">
          <Home books={books} />
        </Route>
        <Route
          path="/books/:title"
          render={routerProps => {
            return <ShowBook books={books} match={routerProps.match} />;
          }}
        />
        <Route path="/new" component={New}/>
      </Switch>
    </div>
  );
}

export default App;
