import React from 'react';
import Protected from '../Protected';
import UsersTable from '../UsersTable';

function PageUsers() {
  return (
    <Protected>
      <UsersTable />
    </Protected>
  );
}

export default PageUsers;
