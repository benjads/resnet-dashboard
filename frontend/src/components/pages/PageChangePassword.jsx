import React from 'react';
import Protected from '../Protected';
import ChangePasswordForm from '../ChangePasswordForm';

function PageChangePassword() {
  return (
    <Protected>
      <ChangePasswordForm />
    </Protected>
  );
}

export default PageChangePassword;
