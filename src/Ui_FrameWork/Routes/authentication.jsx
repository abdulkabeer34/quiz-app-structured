import React from 'react';
import { PublicPages ,PrivatePages} from './pages';
import { RouterProvider } from 'react-router-dom';

export const Authentication = () => {
  const isAuthenticated = Boolean(localStorage.getItem('token'));

  return isAuthenticated ? <RouterProvider router={PrivatePages} /> :<RouterProvider router={PublicPages} /> 
};

