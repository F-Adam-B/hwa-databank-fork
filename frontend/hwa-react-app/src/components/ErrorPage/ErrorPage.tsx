import React from 'react';
import { useLocation } from 'react-router-dom';
import NavBar from '../NavBar';

const ErrorPage = () => {
  // Use location to get the current location's pathname
  const location = useLocation();

  return (
    <>
      <NavBar />
      <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <h1>404 Not Found</h1>
        <p>
          The requested URL <code>{location.pathname}</code> was not found on
          this server.
        </p>
      </div>
    </>
  );
};

export default ErrorPage;
