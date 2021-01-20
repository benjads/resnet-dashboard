import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import * as PropTypes from 'prop-types';

function Protected({ children }) {
  const [loading, setLoading] = useState(true);
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem('resdashUser');

    if (!user) {
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
          localStorage.removeItem('resdashUser');
          console.log('Invalid token. Logging out.');
        }
      }).catch(() => {
        setLoading(false);
        setRedirect(true);
        localStorage.removeItem('resdashUser');
        console.log('Error with HTTP request to server.');
      });
    }
  });

  if (loading) {
    return null;
  }

  if (redirect) {
    return <Redirect to="/login" />;
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

export default Protected;
