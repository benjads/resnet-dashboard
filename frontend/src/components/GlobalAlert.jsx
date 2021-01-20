import React from 'react';
import { Alert } from 'react-bootstrap';
import * as PropTypes from 'prop-types';

function GlobalAlert({ alert }) {
  return (
    <Alert variant={alert.variant}>{alert.message}</Alert>
  );
}

GlobalAlert.propTypes = {
  alert: PropTypes.shape({
    variant: PropTypes.string,
    message: PropTypes.string,
  }).isRequired,
};

export default GlobalAlert;
