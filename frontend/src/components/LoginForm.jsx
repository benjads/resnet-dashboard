import React from 'react';
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Row,
} from 'react-bootstrap';

function LoginForm() {
  return (
    <Container>
      <Row>
        <Col sm="9" md="7" lg="5" className="mx-auto">
          <Card className="my-5">
            <Card.Body>
              <Card.Title className="h5 text-center">Login</Card.Title>
              <Form>
                <Form.Group controlId="input-cruzid">
                  <Form.Label>CruzID</Form.Label>
                  <Form.Control type="text" placeholder="CruzID" />
                </Form.Group>
                <Form.Group controlId="input-password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" placeholder="Password" />
                </Form.Group>
                <Button variant="primary" type="submit">Login</Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default LoginForm;
