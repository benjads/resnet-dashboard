import React, { useContext, useEffect, useState } from 'react';
import {
  Card,
  Col,
  Container,
  Row, Table,
} from 'react-bootstrap';
import * as PropTypes from 'prop-types';
import { getUsers } from '../users';
import { GAlertContext } from './GlobalAlert';

function UsersTable() {
  const [users, setUsers] = useState();

  const { setGAlert } = useContext(GAlertContext);

  useEffect(() => {
    getUsers({
      setGAlert,
      callback: ((body) => {
        setUsers(body.users);
      }),
    });
  }, []);

  return (
    <Container>
      <Row>
        <Col sm="12" className="mx-auto">
          <Card className="my-5">
            <Card.Body>
              <Card.Title className="h5 text-center">Users</Card.Title>
              {users ? (
                <Table striped bordered>
                  <thead>
                    <tr>
                      <th>CruzID</th>
                      <th>First Name</th>
                      <th>Last Name</th>
                      <th>Role</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <UserRow user={user} key={user.cruzid} />
                    ))}
                  </tbody>
                </Table>
              )
                : <h3>Loading...</h3>}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

function UserRow({ user }) {
  let prettyRole;
  switch (user.role) {
    case 'tech':
      prettyRole = 'Technician';
      break;
    case 'dev-tech':
      prettyRole = 'Developer Technician';
      break;
    case 'supervisor':
      prettyRole = 'Supervisor';
      break;
    default:
      prettyRole = 'Other';
      break;
  }

  return (
    <tr>
      <td>{user.cruzid}</td>
      <td>{user.firstName}</td>
      <td>{user.lastName}</td>
      <td>{prettyRole}</td>
    </tr>
  );
}

UserRow.propTypes = {
  user: PropTypes.shape({
    cruzid: PropTypes.string.isRequired,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
  }).isRequired,
};

export default UsersTable;
