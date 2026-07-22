import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuthStore, type UserRole } from '../store/useAuthStore';
import { Loader2 } from 'lucide-react';

interface ProtectedRouteProps {
  allowedRoles?: UserRole[];
}

export default function ProtectedRoute({ allowedRoles }: ProtectedRouteProps) {
  const { isAuthenticated, isLoading, user } = useAuthStore();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (!isAuthenticated) {
    // Redirect them to the /login page (or role-specific login), but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience.
    const segments = location.pathname.split('/').filter(Boolean);
    const roleMatch = segments.length > 0 ? segments[0] : null;
    const validRoles = ['student', 'recruiter', 'faculty', 'department', 'admin', 'erp'];
    const redirectPath = roleMatch && validRoles.includes(roleMatch) 
      ? `/${roleMatch}/login` 
      : '/login';

    return <Navigate to={redirectPath} state={{ from: location }} replace />;
  }

  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    // User is logged in but doesn't have the right role for this route
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-center px-4">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">403 Forbidden</h1>
        <p className="text-gray-600 mb-6">You don't have permission to access this page.</p>
        <button 
          onClick={() => window.history.back()}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Go Back
        </button>
      </div>
    );
  }

  return <Outlet />;
}
