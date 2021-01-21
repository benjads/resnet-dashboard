import React, { useMemo, useState } from 'react';
import {
  BrowserRouter as Router, Route, Switch,
} from 'react-router-dom';
import './App.scss';
import { Container } from 'react-bootstrap';
import PageLogin from './components/pages/PageLogin';
import TopNav from './components/nav/TopNav';
import Protected from './components/Protected';
import { UserContext } from './users';
import { GAlertContext, GlobalAlert } from './components/GlobalAlert';
import PageChangePassword from './components/pages/PageChangePassword';

function App() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('resdashUser')));
  const [gAlert, setGAlert] = useState(null);

  const userProviderValue = useMemo(() => ({ user, setUser }), [user, setUser]);
  const gAlertValue = useMemo(() => ({ gAlert, setGAlert }), [gAlert, setGAlert]);

  return (
    <Router>
      <div>
        <GAlertContext.Provider value={gAlertValue}>
          <UserContext.Provider value={userProviderValue}>
            <TopNav />
            <GlobalAlert />

            <Switch>
              <Route exact path="/">
                <Protected>
                  <Home />
                </Protected>
              </Route>
              <Route exact path="/login">
                <PageLogin />
              </Route>
              <Route exact path="/change-password">
                <PageChangePassword />
              </Route>
            </Switch>
          </UserContext.Provider>
        </GAlertContext.Provider>
      </div>
    </Router>
  );
}

function Home() {
  return (
    <Container>
      <h1>Content</h1>
    </Container>
  );
}

export default App;
