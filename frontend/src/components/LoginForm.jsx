import React, { useContext, useState } from 'react';
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Row,
} from 'react-bootstrap';
import { login, UserContext } from '../users';
import { GAlertContext } from './GlobalAlert';

function LoginForm() {
  const [cruzid, setCruzid] = useState(null);
  const [password, setPassword] = useState(null);

  const { setUser } = useContext(UserContext);
  const { setGAlert } = useContext(GAlertContext);

  const onCruzidChange = (event) => {
    setCruzid(event.target.value);
  };

  const onPasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();

    login({
      cruzid, password, setUser, setGAlert,
    });
  };

  return (
    <Container>
      <Row>
        <Col sm="9" md="7" lg="5" className="mx-auto">
          <Card className="my-5">
            <Card.Body>
              <Card.Title className="h5 text-center">Login</Card.Title>
              <Form onSubmit={onSubmit}>
                <Form.Group controlId="input-cruzid">
                  <Form.Label>CruzID</Form.Label>
                  <Form.Control type="text" placeholder="CruzID" onChange={onCruzidChange} />
                </Form.Group>
                <Form.Group controlId="input-password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" placeholder="Password" onChange={onPasswordChange} />
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
