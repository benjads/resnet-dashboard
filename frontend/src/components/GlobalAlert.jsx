import React, { useContext, useEffect } from 'react';
import { Alert } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

export const GAlertContext = React.createContext(null);

export function GlobalAlert() {
  const history = useHistory();
  const { setGAlert } = useContext(GAlertContext);

  useEffect(() => history.listen(() => {
    setGAlert(null);
  }));

  return (
    <GAlertContext.Consumer>
      {({ gAlert }) => {
        if (gAlert) {
          return (
            <Alert variant={gAlert.variant}>{gAlert.message}</Alert>
          );
        }
        return null;
      }}
    </GAlertContext.Consumer>
  );
}
