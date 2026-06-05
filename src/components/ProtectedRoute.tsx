import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useSubscription } from '../contexts/SubscriptionContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredModule?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, requiredModule }) => {
  const { user, loading, isAuthenticated } = useAuth();
  const { hasAccess } = useSubscription();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-blue-900 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600 text-sm">Chargement...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  if (user?.role === 'super_admin') {
    return <>{children}</>;
  }

  if (requiredModule && !hasAccess(requiredModule)) {
    return <Navigate to="/upgrade" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;