import React from 'react';
import {
  Card,
  Col,
  Container,
  Row,
} from 'react-bootstrap';

function UsersTable() {
  return (
    <Container>
      <Row>
        <Col sm="12" className="mx-auto">
          <Card className="my-5">
            <Card.Body>
              <Card.Title className="h5 text-center">Users</Card.Title>

            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default UsersTable;
