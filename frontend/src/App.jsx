import React, { useMemo, useState } from 'react';
import {
  BrowserRouter as Router, Route, Switch,
} from 'react-router-dom';
import './App.scss';
import PageLogin from './components/pages/PageLogin';
import TopNav from './components/nav/TopNav';
import Protected from './components/Protected';
import { login, logout, UserContext } from './users';
import { GAlertContext, GlobalAlert } from './components/GlobalAlert';

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
            <TopNav logout={logout} />
            <GlobalAlert />

            <Switch>
              <Route exact path="/">
                <Protected>
                  <Home />
                </Protected>
              </Route>
              <Route exact path="/login">
                <PageLogin login={login} />
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
    <div>
      <h2 className="text-info">Home</h2>
    </div>
  );
}

export default App;
