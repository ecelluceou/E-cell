import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Loader as RouteLoader } from './UI/Loader';

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) return <RouteLoader />;
  if (!user) return <Navigate to="/auth" replace />;
  return children;
}
