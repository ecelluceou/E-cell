import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Loader } from './UI/Loader';

export default function AdminRoute({ children }) {
  const { user, profile, loading } = useAuth();

  if (loading) {
    return <Loader />;
  }

  // Ensure user is logged in and has the admin role
  if (!user || !profile || profile.role !== 'admin') {
    return <Navigate to="/" replace />;
  }

  return children;
}
