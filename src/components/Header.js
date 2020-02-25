import React, { useContext } from 'react';
import { UserContext } from '../UserContext';
import { Link, Route } from 'react-router-dom';

function Header() {
  const { user, setUser } = useContext(UserContext);
  return (
    <header>
      <div className="logoName">
        {/* Great job using PUBLIC_URL here! */}
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
      {!user && (
        <Route exact path={['/', '/signin', '/signup']}>
          <Link to="/signin">Sign In</Link>
          <Link to="/signup">Sign Up</Link>
        </Route>
      )}
      {user && (
        <>
          <Route exact path={['/', '/books']}>
            <Link to="/new" className="button">
              Add a book
            </Link>
            <Link to="/" onClick={() => setUser(null)}>
              Sign Out
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
            <Link to="/" className="button">
              Cancel
            </Link>
          </Route>
        </>
      )}
    </header>
  );
}

export default Header;
