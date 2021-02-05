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

export function changePassword({ oldPassword, newPassword, setGAlert }) {
  const user = localStorage.getItem('resdashUser');
  const { token } = JSON.parse(user);

  fetch('http://localhost:9000/auth/changePassword', {
    method: 'POST',
    body: JSON.stringify({
      oldPassword,
      newPassword,
    }),
    headers: {
      'Content-Type': 'application/json',
      'X-Access-Token': token,
    },
  }).then((res) => {
    if (res.status === 200) {
      console.log('Password successfully changed.');
      setGAlert({
        variant: 'success',
        message: 'Password successfully changed!',
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
      message: 'Error changing password! Please try again.',
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

export function getUsers({ setGAlert, callback }) {
  const user = localStorage.getItem('resdashUser');
  const { token } = JSON.parse(user);

  fetch('http://localhost:9000/auth/users', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'X-Access-Token': token,
    },
  }).then((res) => {
    res.json().then((body) => {
      if (res.status !== 200) {
        console.log('Error response from server.');
        setGAlert({
          variant: 'danger',
          message: body.error,
        });
        callback(null);
        return;
      }

      callback(body);
    }).catch(() => {
      console.log('Error with HTTP request to server.');
      setGAlert({
        variant: 'danger',
        message: 'Error changing password! Please try again.',
      });
      callback(null);
    });
  });
}
