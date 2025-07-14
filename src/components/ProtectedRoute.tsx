// src/components/ProtectedRoute.tsx
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { token, user, loading } = useAuth();
  const location = useLocation();

  if (loading) return null; // or <Spin /> or splash screen

  if (!token || !user || !user.roles.includes('admin')) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}
