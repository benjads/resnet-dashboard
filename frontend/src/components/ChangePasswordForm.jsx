import React, { useContext, useState } from 'react';
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Row,
} from 'react-bootstrap';
import { changePassword } from '../users';
import { GAlertContext } from './GlobalAlert';

function ChangePasswordForm() {
  const [oldPassword, setOldPassword] = useState(null);
  const [newPassword, setNewPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);

  const { setGAlert } = useContext(GAlertContext);

  const onOldPasswordChange = (event) => {
    setOldPassword(event.target.value);
  };

  const onNewPasswordChange = (event) => {
    setNewPassword(event.target.value);
  };

  const onConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();

    if (!oldPassword || !newPassword || !confirmPassword) {
      setGAlert({
        variant: 'danger',
        message: 'You must fill out all fields!',
      });
      return;
    }

    if (newPassword !== confirmPassword) {
      setGAlert({
        variant: 'danger',
        message: 'New passwords do not match!',
      });
      return;
    }

    changePassword({ oldPassword, newPassword, setGAlert });
  };

  return (
    <Container>
      <Row>
        <Col sm="9" md="7" lg="5" className="mx-auto">
          <Card className="my-5">
            <Card.Body>
              <Card.Title className="h5 text-center">Change Password</Card.Title>
              <Form onSubmit={onSubmit}>
                <Form.Group controlId="input-old-password">
                  <Form.Label>Old Password</Form.Label>
                  <Form.Control type="password" placeholder="Old Password" onChange={onOldPasswordChange} />
                </Form.Group>
                <Form.Group controlId="input-new-password">
                  <Form.Label>New Password</Form.Label>
                  <Form.Control type="password" placeholder="New Password" onChange={onNewPasswordChange} />
                </Form.Group>
                <Form.Group controlId="input-confirm-password">
                  <Form.Label>Confirm New Password</Form.Label>
                  <Form.Control type="password" placeholder="Confirm New Password" onChange={onConfirmPasswordChange} />
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

export default ChangePasswordForm;
