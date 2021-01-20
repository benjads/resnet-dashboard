import React, { useState } from 'react';
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Row,
} from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import * as PropTypes from 'prop-types';

function LoginForm({ setAlert, setUser }) {
  const [cruzid, setCruzid] = useState(null);
  const [password, setPassword] = useState(null);
  const history = useHistory();

  const onCruzidChange = (event) => {
    setCruzid(event.target.value);
  };

  const onPasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();

    fetch('http://localhost:9000/auth/login', {
      method: 'POST',
      body: JSON.stringify({
        cruzid,
        password,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((res) => {
      if (res.status === 200) {
        res.json().then((json) => {
          console.log('Logged in. Setting token in local storage.');
          localStorage.setItem('resdashUser', JSON.stringify(json));
          setUser(json);
        });

        history.push('/');
      } else {
        res.json().then((body) => {
          console.log('Error response from server.');
          setAlert({
            variant: 'danger',
            message: body.error,
          });
        });
      }
    }).catch(() => {
      console.log('Error with HTTP request to server.');
      setAlert({
        variant: 'danger',
        message: 'Error logging in! Please try again.',
      });
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

LoginForm.propTypes = {
  setAlert: PropTypes.func.isRequired,
  setUser: PropTypes.func.isRequired,
};

export default LoginForm;
