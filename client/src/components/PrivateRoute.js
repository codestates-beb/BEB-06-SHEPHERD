import React from 'react';

import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = (props) => {
  const auth = useAuth();

  return auth ? <Outlet /> : <Navigate to='/login' />;
};

export default PrivateRoute;
