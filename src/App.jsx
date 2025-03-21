import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./components/login"; // FIXED PATH
import RegistrationPage from "./components/registration"; // FIXED PATH
import ProfilePage from "./components/profile"; // FIXED PATH
import Sidebar from "./components/Sidebar"; // FIXED PATH
import ProtectedRoute from "./ProtectedRoute";
import Dashboard from "./pages/dashboard"; // FIXED PATH & CASE


function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes (Without Sidebar) */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegistrationPage />} />

        {/* Protected Routes (With Sidebar) */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Layout>
                <Dashboard />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Layout>
                <ProfilePage />
              </Layout>
            </ProtectedRoute>
          }
        />

        {/* Default Route */}
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

// Layout Component (Wraps protected routes)
const Layout = ({ children }) => (
  <div style={{ display: "flex" }}>
    <Sidebar />
    <div style={{ flex: 1 }}>{children}</div>
  </div>
);

export default App;
