import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import './App.scss';
import PageLogin from './components/pages/PageLogin';
import TopNav from './components/TopNav';

function App() {
  return (
    <Router>
      <div>
        <TopNav />

        <hr />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/login">
            <PageLogin />
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
