// import React from 'react';
// import { Navigate, Outlet } from 'react-router-dom';
//
// export default function ProtectedRoute({ allowedRoles }) {
//     const storedUser = localStorage.getItem('user');
//     const user = storedUser ? JSON.parse(storedUser) : null;
//
//     if (!user) {
//         return <Navigate to="/login" replace />;
//     }
//
//     if (allowedRoles && !allowedRoles.includes(user.role)) {
//         return <Navigate to="/" replace />;
//     }
//
//     return <Outlet />;
// }