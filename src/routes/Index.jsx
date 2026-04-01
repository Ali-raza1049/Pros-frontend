import React from "react";
import { Routes, Route } from "react-router-dom";

import CustomerLayout from "../layout/CustomerLayout";
import AdminLayout from "../layout/AdminLayout";
import ProtectedRoute from "../components/ProtectedRoute";

// Customer Pages
import { HomePage } from "../Page/customer/HomePage";
import ServicePage from "../Page/customer/ServicePage";
import BookingPage from "../Page/customer/BookingPage";
import AboutUsPage from "../Page/customer/AboutUsPage";
import ContactUsPage from "../Page/customer/ContactUsPage";

// Admin Pages
import DashboardPage from "../Page/owner/DashboardPage";
import BookingsPage from "../Page/owner/BookingsPage";
import ServicesPage from "../Page/owner/ServicesPage";
import AdminLogin from "../Page/owner/AdminLogin";

export default function AppRoutes() {
  return (
    <Routes>
      {/* ================= CUSTOMER ROUTES ================= */}
      <Route element={<CustomerLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/services" element={<ServicePage />} />
        <Route path="/book" element={<BookingPage />} />
        <Route path="/about" element={<AboutUsPage />} />
        <Route path="/contact" element={<ContactUsPage />} />
      </Route>

      {/* ================= ADMIN LOGIN (PUBLIC) ================= */}
      <Route path="/admin-login" element={<AdminLogin />} />

      {/* ================= ADMIN DASHBOARD (PROTECTED) ================= */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<DashboardPage />} />
        <Route path="bookings" element={<BookingsPage />} />
        <Route path="services" element={<ServicesPage />} />
      </Route>
    </Routes>
  );
}