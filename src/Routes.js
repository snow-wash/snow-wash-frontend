import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Login from './pages/LoginPage';
import DashboardLayout from './components/DashboardLayout';
import Dashboard from './pages/DashboardPage';
import User from './pages/User';
import Service from './pages/ServicePage';
import Quota from './pages/QuotaPage';
import Transaction from './pages/TransactionPage';
import AddTransactionPage from './pages/AddTransactionPage';

const PrivateRoute = ({ children }) => {
  const userData = localStorage.getItem('userData');
  return userData ? children : <Navigate to="/login" />;
};

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<Login />} />

      {/* Dashboard Routes wrapped in DashboardLayout */}
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <DashboardLayout />
          </PrivateRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="user" element={<User />} />
        <Route path="service" element={<Service />} />
        <Route path="quota" element={<Quota />} />
        <Route path="transaction" element={<Transaction />} />
        <Route path="transaction/add" element={<AddTransactionPage />} />
      </Route>

      {/* Redirect unknown routes to HomePage */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default AppRoutes;
