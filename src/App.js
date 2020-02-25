import React, { useState } from 'react';
import { UserContext } from './UserContext';
import { Switch, Route, Redirect } from 'react-router-dom';
import Header from './components/Header';
import SignIn from './components/Signin';
import SignUp from './components/Signup';
import Home from './components/Home';
import New from './components/New';
import Edit from './components/Edit';
import ShowBook from './components/ShowBook';

function App() {
  const [user, setUser] = useState(null);
  // JAM: It'll be easier to move Header and the books operations for Home into its own component!
  // This helps keep App more concise and easier to update in the future.  Additionally, it'll
  // make it easier to render different content based on different states, such as
  // whether the person is logged in or not, whether they have books or not,
  // and whether there's an error in retreiving the books, etc.
  return (
    <div className="App">
      <UserContext.Provider value={{ user, setUser }}>
        <Header />
        <main>
          <Switch>
            <Route exact path="/signup" component={SignUp} />
            <Route exact path="/signin" component={SignIn} />
            <Route exact path="/" component={Home} />
            <Route
              exact
              path="/new"
              render={props => {
                if (user) {
                  return <New {...props} />;
                } else {
                  return <Redirect to="/" />;
                }
              }}
            />
            <Route
              exact
              path="/books/:id"
              render={props => {
                if (user) {
                  return <ShowBook {...props} />;
                } else {
                  return <Redirect to="/" />;
                }
              }}
            />
            <Route
              exact
              path="/books/:id/edit"
              render={props => {
                if (user) {
                  return <Edit {...props} />;
                } else {
                  return <Redirect to="/" />;
                }
              }}
            />
            <Route path="/*" render={() => <Redirect to="/" />} />}
          </Switch>
        </main>
      </UserContext.Provider>
    </div>
  );
}

export default App;
