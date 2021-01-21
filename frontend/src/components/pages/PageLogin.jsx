import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import LoginForm from '../LoginForm';

function PageLogin() {
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
    <LoginForm />
  );
}

export default PageLogin;
