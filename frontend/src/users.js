import React from 'react';

export const UserContext = React.createContext(null);

export function login({
  cruzid, password, setUser, setGAlert,
}) {
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
    } else {
      res.json().then((body) => {
        console.log('Error response from server.');
        setGAlert({
          variant: 'danger',
          message: body.error,
        });
      });
    }
  }).catch(() => {
    console.log('Error with HTTP request to server.');
    setGAlert({
      variant: 'danger',
      message: 'Error logging in! Please try again.',
    });
  });
}

export function logout({ setUser, setGAlert }) {
  localStorage.removeItem('resdashUser');
  setUser(null);
  setGAlert({
    variant: 'info',
    message: 'You are now logged out.',
  });
}
