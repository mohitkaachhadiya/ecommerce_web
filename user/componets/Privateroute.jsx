import React, { useContext } from 'react';
import { Appcontex } from '../context/Appcontext';
import { Navigate, Outlet } from 'react-router-dom';

const Privateroute = ({ roles }) => {
    const { user,loading } = useContext(Appcontex);
      if (loading) return null;
      if (roles?.length && !roles.includes(user?.role)) {
        return <Navigate to='/home' replace />;
      }
    return user ? <Outlet /> : <Navigate to='/' />;
};

export default Privateroute;
