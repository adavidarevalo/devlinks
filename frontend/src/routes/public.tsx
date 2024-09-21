import React from 'react'
import { Route } from 'react-router-dom';
import LoginPage from '../pages/login';
import RegisterPage from '../pages/register';

export default function PublicRoutes() {
  return (
      <>
        <Route path="/login" element={<LoginPage />} /> 
        <Route path="/register" element={<RegisterPage />} />
      </>
  )
}

