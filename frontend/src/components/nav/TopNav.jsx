import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import * as PropTypes from 'prop-types';
import NavProfile from './NavProfile';

function TopNav({ user, logout }) {
  return (
    <Navbar bg="primary" expand="lg" variant="dark">
      <Navbar.Brand>ResNet Dashboard</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="top-navbar-nav" className="justify-content-end">
        <Nav>
          <NavProfile user={user} logout={logout} />
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

TopNav.propTypes = {
  user: PropTypes.shape({
    cruzid: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    token: PropTypes.string,
  }),
  logout: PropTypes.func.isRequired,
};

TopNav.defaultProps = {
  user: null,
};

export default TopNav;
