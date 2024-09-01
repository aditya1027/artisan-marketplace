import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { loginCustomer } from '../../features/authSlice';

const AuthCheck = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // If token exists, dispatch an action to set the auth state
      dispatch(loginCustomer({ token }));
    }
  }, [dispatch]);

  return null; // This component doesn't render anything
};

export default AuthCheck;
