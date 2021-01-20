import React from 'react';
import * as PropTypes from 'prop-types';
import { Nav, NavDropdown } from 'react-bootstrap';

function NavProfile({ user, setUser }) {
  function logout(e) {
    e.preventDefault();
    localStorage.removeItem('resdashUser');
    setUser(null);
  }

  if (user) {
    return (
      <NavDropdown title={`${user.firstName} ${user.lastName}`} id="user-nav-dropdown">
        <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
      </NavDropdown>
    );
  }
  return (<Nav.Item>Guest</Nav.Item>);
}

NavProfile.propTypes = {
  user: PropTypes.shape({
    cruzid: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    token: PropTypes.string,
  }),
  setUser: PropTypes.func.isRequired,
};

NavProfile.defaultProps = {
  user: null,
};

export default NavProfile;
