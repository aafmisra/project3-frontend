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

  //pulls all books from the database
  function getBooks() {
    const url = `https://book-bear-api.herokuapp.com/books`;

    fetch(url)
      .then(res => res.json())
      .then(data => {
        setBooks(data);
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
  //return switches and routes for main content and header navigation buttons
  return (
    <div className="App">
      <header>
        <div className="logoName">
          <img
            src={process.env.PUBLIC_URL + '/logo.png'}
            alt="bookbear logo"
            className="logo"
          />

          <h1>
            <Link to="/books">
              Book<br></br>Bear
            </Link>
          </h1>
        </div>
        <Switch>
          <Route exact path={['/', '/books']}>
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
          <Route exact path={['/', '/books']}>
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
      <footer>
        <p>© BookBear Team 2020</p>
        <a
          href="https://github.com/aafmisra/project3-frontend"
          target="_blank"
          rel="noopener noreferrer"
        >
          frontend repo on GitHub
        </a>
        <a
          href="https://github.com/jpettett/book-bear-api"
          target="_blank"
          rel="noopener noreferrer"
        >
          backend repo on GitHub
        </a>
      </footer>
    </div>
  );
}

export default App;
