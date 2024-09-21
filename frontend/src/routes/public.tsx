import React from 'react'
import { Route } from 'react-router-dom'; // {{ edit_1 }}
import LoginPage from '../pages/login';
import RegisterPage from '../pages/register';

export default function PublicRoutes() {
  return (
      <>
        <Route path="/login" component={LoginPage} /> 
        <Route path="/register" component={RegisterPage} />
      </>
  )
}

