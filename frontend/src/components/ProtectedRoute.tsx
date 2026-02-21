import { Navigate, Outlet } from 'react-router-dom';

export function ProtectedRoute() {
    const user = localStorage.getItem('user');

    if (!user) {
        // Redirect to login if not authenticated
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
}
