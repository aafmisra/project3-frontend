import React, { useState, useEffect } from 'react';
// import logo from './logo.svg';
import Home from './components/Home';
import New from './components/New';
import Edit from './components/Edit';
import { Link, Switch, Route } from 'react-router-dom';
import ShowBook from './components/ShowBook';

function App() {
  const [books, setBooks] = useState([]);
  const [error, setError] = useState(false);

  function getBooks() {
    const url = `http://localhost:4000/books`;

    fetch(url)
      .then(res => res.json())
      .then(data => {
        setBooks(data);
        console.log(data);
      })
      .catch(() => {
        setError(true);
      });
  }

  // run getBooks only on initial component mount
  // (happens once when page first loads, or manual
  // refresh)
  useEffect(() => {
    getBooks();
  }, []);

  //displays error message if books can't be retrieved
  if (error) {
    return <div>Sorry, there was an error getting the books</div>;
  }

  return (
    <div className="App">
      <header>
        <h1>
          <Link to="/books">BookBear</Link>
        </h1>
        <Switch>
          <Route exact path="/books">
            <Link to="/new" className="button">
              Add a book
            </Link>
          </Route>
          <Route
            exact
            path="/books/:id"
            render={routerProps => {
              return (
                <Link
                  to={`/books/${routerProps.match.params.id}/edit`}
                  className="button"
                >
                  Edit
                </Link>
              );
            }}
          />
          ;
          <Route path="/new">
            <Link to="/books" className="button">
              Cancel
            </Link>
          </Route>
          <Route exact path="/books/:id/edit">
            <Link to="./" className="button">
              Cancel
            </Link>
          </Route>
        </Switch>
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
