import React, { useContext, useEffect, useState } from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import * as PropTypes from 'prop-types';
import { logout, UserContext } from '../users';
import { GAlertContext } from './GlobalAlert';

function Protected({ children }) {
  const [loading, setLoading] = useState(true);
  const [redirect, setRedirect] = useState(false);

  const { setUser } = useContext(UserContext);
  const { setGAlert } = useContext(GAlertContext);

  useEffect(() => {
    const user = localStorage.getItem('resdashUser');

    if (redirect) {
      return;
    }

    if (!user) {
      console.log('Unauthenticated user, redirecting...');
      setRedirect(true);
    } else {
      console.log('Sending verify request (in Protected)');

      const { token } = JSON.parse(user);
      fetch('http://localhost:9000/auth/verify', {
        method: 'GET',
        headers: {
          'X-Access-Token': token,
        },
      }).then((res) => {
        if (res.status === 200) {
          setLoading(false);
        } else {
          setLoading(false);
          setRedirect(true);
          logout({ setUser, setGAlert });
          console.log('Invalid token. Logging out.');
        }
      }).catch(() => {
        setLoading(false);
        setRedirect(true);
        logout({ setUser, setGAlert });
        console.log('Error with HTTP request to server.');
      });
    }
  });

  if (redirect) {
    return <Redirect to="/login" />;
  }

  if (loading) {
    console.log('Loading...');
    return null;
  }

  return (
    <>
      {children}
    </>
  );
}

Protected.propTypes = {
  children: PropTypes.node.isRequired,
};

export default withRouter(Protected);
