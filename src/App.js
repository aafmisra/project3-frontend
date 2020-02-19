import React, { useState, useEffect } from 'react';
// import logo from './logo.svg';
import Home from './components/Home';
import New from './components/New';
import Edit from './components/Edit';
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

  // run getBooks only on initial component mount (happens once)
  useEffect(() => {
    getBooks();
  }, []);

  return (
    <div className="App">
      <header>
        <Link to="/books">
          <h1>BookBear</h1>
        </Link>
        <Link to="/new">Add a book</Link>
      </header>
      <main>
        <Switch>
          <Route exact path="/books">
            <Home books={books} />
          </Route>
          <Route
            exact
            path="/books/:id"
            render={routerProps => {
              return (
                <ShowBook
                  getBooks={getBooks}
                  books={books}
                  match={routerProps.match}
                />
              );
            }}
          />
          <Route path="/new" render={() => <New getBooks={getBooks} />} />
          <Route
            path="/books/:id/edit"
            render={routerProps => {
              return (
                <Edit
                  getBooks={getBooks}
                  books={books}
                  match={routerProps.match}
                />
              );
            }}
          />
        </Switch>
      </main>
    </div>
  );
}

export default App;
