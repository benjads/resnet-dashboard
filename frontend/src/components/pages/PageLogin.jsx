import React, { useEffect, useState } from 'react';
import * as PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import LoginForm from '../LoginForm';

function PageLogin({ setAlert, setUser }) {
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('resdashUser')) {
      setRedirect(true);
    }
  });

  if (redirect) {
    console.log('Already logged in. Redirecting to home.');
    return <Redirect to="/" />;
  }

  return (
    <>
      <LoginForm setAlert={setAlert} setUser={setUser} />
    </>
  );
}

PageLogin.propTypes = {
  setAlert: PropTypes.func.isRequired,
  setUser: PropTypes.func.isRequired,
};

export default PageLogin;
