import React from 'react';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children, loggedIn, openPopup }) {

  React.useEffect(() => {
    if (!loggedIn) {
      console.log(loggedIn);
      openPopup('Sign in');
    }
  }, [])


  return loggedIn ? children : <Navigate to="/" />;
}

export default ProtectedRoute;