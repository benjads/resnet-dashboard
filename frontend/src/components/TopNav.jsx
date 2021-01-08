import React from 'react';
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';

function TopNav() {
  return (
    <Navbar bg="primary" expand="lg" variant="dark">
      <Navbar.Brand>ResNet Dashboard</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="top-navbar-nav" className="justify-content-end">
        <Nav className="mr-auto">
          <NavDropdown title="Sammy Slug" id="user-nav-dropdown">
            <NavDropdown.Item>Logout</NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default TopNav;
