import React from 'react'
import { useAuth } from '../context/auth';
import { Navigate, useNavigate } from 'react-router-dom';



export default function Login() {
  const navigate = useNavigate(); 
  const {isAuthenticated,setIsAuthenticated} = useAuth(); 
  function handleLogin(){
    setIsAuthenticated(!isAuthenticated);
    navigate('/');
  }
  if(isAuthenticated){
     return (
      <>
          <h1>Log Out</h1>
          <button onClick={handleLogin}>LogOut Now</button>
      </>
    ); 
  }
  else{
    return (
    <>
        <h1>Login</h1>
        <button onClick={handleLogin}>Login Now</button>
    </>
  )}
}
