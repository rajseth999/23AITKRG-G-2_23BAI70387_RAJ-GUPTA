import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./services/AuthContext";
import PrivateRoute from "./components/PrivateRoute";
import Navbar from "./components/Navbar";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import OAuth2CallbackPage from "./pages/OAuth2CallbackPage";
import ProductsPage from "./pages/ProductsPage";
import ProfilePage from "./pages/ProfilePage";
import AdminPage from "./pages/AdminPage";
import { HomePage, ModeratorPage, UnauthorizedPage } from "./pages/OtherPages";

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          {/* Public routes */}
          <Route path="/"             element={<HomePage />} />
          <Route path="/login"        element={<LoginPage />} />
          <Route path="/register"     element={<RegisterPage />} />
          <Route path="/oauth2/callback" element={<OAuth2CallbackPage />} />
          <Route path="/unauthorized" element={<UnauthorizedPage />} />

          {/* Authenticated routes */}
          <Route path="/products" element={
            <PrivateRoute><ProductsPage /></PrivateRoute>
          } />
          <Route path="/profile" element={
            <PrivateRoute><ProfilePage /></PrivateRoute>
          } />

          {/* Moderator+ routes */}
          <Route path="/mod" element={
            <PrivateRoute roles={["ROLE_MODERATOR","ROLE_ADMIN"]}>
              <ModeratorPage />
            </PrivateRoute>
          } />

          {/* Admin-only routes */}
          <Route path="/admin" element={
            <PrivateRoute roles={["ROLE_ADMIN"]}>
              <AdminPage />
            </PrivateRoute>
          } />
        </Routes>
      </Router>
    </AuthProvider>
  );
}
