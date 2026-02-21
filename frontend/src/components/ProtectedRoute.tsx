import { Navigate, Outlet, useLocation } from 'react-router-dom';
import type { UserRole } from '../constants/auth';
import { hasPermission } from '../constants/auth';

interface ProtectedRouteProps {
    allowedRoles?: UserRole[];
}

export function ProtectedRoute(_props: ProtectedRouteProps) {
    const userString = localStorage.getItem('user');
    const location = useLocation();

    if (!userString) {
        return <Navigate to="/" replace />;
    }

    const user = JSON.parse(userString);
    const role = user.role as UserRole;

    // Check if path is allowed for this role
    if (!hasPermission(role, location.pathname)) {
        return <Navigate to="/dashboard" replace />;
    }

    return <Outlet />;
}
