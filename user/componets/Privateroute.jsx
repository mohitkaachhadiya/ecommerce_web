import React, { useContext } from 'react';
import { Appcontex } from '../context/Appcontext';
import { Navigate, Outlet } from 'react-router-dom';

const Privateroute = () => {
    const { user,loading } = useContext(Appcontex);
      if (loading) return null;
    return user ? <Outlet /> : <Navigate to='/' />;
};

export default Privateroute;
