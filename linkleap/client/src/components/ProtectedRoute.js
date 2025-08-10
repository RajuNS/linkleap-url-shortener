import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import { Spinner, Center } from '@chakra-ui/react';

const ProtectedRoute = () => {
    const { user, token } = useContext(AuthContext);
    
    // A simple check for the token. In a real app, you might have a 'loading' state.
    if (token && !user) {
        return <Center h="100vh"><Spinner /></Center>; // Show loading while user data is fetched
    }

    return user ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
