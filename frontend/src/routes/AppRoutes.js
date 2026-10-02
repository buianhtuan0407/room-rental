import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import Home from '../pages/Home';
import Register from '../pages/Register';
import ForgotPassword from '../pages/ForgotPassword';
import Login from '../pages/Login';
import AdminLayout from "../layouts/AdminLayout";
import LandlordLayout from "../layouts/LandlordLayout";
import ProtectedRoute from './ProtectedRoute';

export default function AppRoutes() {
    return (
        <Router>
            <Routes>
                {/* Public Routes */}
                <Route
                    path="/"
                    element={
                        <MainLayout>
                            <Home />
                        </MainLayout>
                    }
                />
                <Route path="/register" element={<Register />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/login" element={<Login />} />

                {/*<Route element={<ProtectedRoute allowedRoles={['ADMIN']} />}>*/}
                {/*    <Route path="/admin" element={<AdminLayout />} />*/}
                {/*</Route>*/}
                <Route path="/admin" element={<AdminLayout />} />
                {/*<Route element={<ProtectedRoute allowedRoles={['LANDLORD']} />}>*/}
                {/*    <Route path="/landlord" element={<LandlordLayout />} />*/}
                {/*</Route>*/}
                <Route path="/landlord" element={<LandlordLayout />} />

                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </Router>
    );
}