import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import './App.scss';
import PageLogin from './components/pages/PageLogin';
import TopNav from './components/nav/TopNav';
import GlobalAlert from './components/GlobalAlert';
import Protected from './components/Protected';

function App() {
  const [alert, setAlert] = useState(null);
  const [user, setUser] = useState(localStorage.getItem('resdashUser'));

  return (
    <Router>
      <div>
        <TopNav user={user} />
        {alert ? <GlobalAlert alert={alert} /> : null}

        <Switch>
          <Route exact path="/">
            <Protected>
              <Home />
            </Protected>
          </Route>
          <Route exact path="/login">
            <PageLogin setUser={setUser} setAlert={setAlert} />
          </Route>
        </Switch>
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
