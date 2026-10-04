import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

export default function ProtectedRoute({ allowedRoles }) {
    const storedUser = localStorage.getItem('user');
    const user = storedUser ? JSON.parse(storedUser) : null;

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    const userRole = user.role ? user.role.toUpperCase() : '';
    const formattedAllowedRoles = allowedRoles ? allowedRoles.map(r => r.toUpperCase()) : [];

    if (formattedAllowedRoles.length > 0 && !formattedAllowedRoles.includes(userRole)) {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
}