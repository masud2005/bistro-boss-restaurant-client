import React, { useContext } from 'react';
import { AuthContext } from '../providers/AuthProvider';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
    const {user, loading} = useContext(AuthContext);
    const location = useLocation();
    // console.log(location);

    if(user) {
        return children;
    }

    if(loading) {
        return <h1 className='text-5xl font-bold'>Loading...</h1>
    }

    return <Navigate to={'/sign-in'} state={location.pathname}/>
};

export default PrivateRoute;