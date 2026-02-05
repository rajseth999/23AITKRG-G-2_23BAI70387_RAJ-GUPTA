import React from 'react'
import { useAuth } from '../context/auth'
import { Navigate } from 'react-router-dom';

export default function AuthProtectedRoutes({children}) {
    const {isAuthenticated} = useAuth(); 
    
    return isAuthenticated ? children : <Navigate to='/login' /> 
}
