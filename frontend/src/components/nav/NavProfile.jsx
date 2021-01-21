import React, { useContext } from 'react';
import { Nav, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { logout, UserContext } from '../../users';
import { GAlertContext } from '../GlobalAlert';

function NavProfile() {
  const { user, setUser } = useContext(UserContext);
  const { setGAlert } = useContext(GAlertContext);

  function handleLogout(e) {
    e.preventDefault();
    logout({ setUser, setGAlert });
  }

  if (user) {
    return (
      <NavDropdown alignRight title={`${user.firstName} ${user.lastName}`} id="user-nav-dropdown">
        <LinkContainer to="/change-password">
          <NavDropdown.Item>Change Password</NavDropdown.Item>
        </LinkContainer>
        <NavDropdown.Divider />
        <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
      </NavDropdown>
    );
  }
  return (<Nav.Item className="text-white">Guest</Nav.Item>);
}

export default NavProfile;
