import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const CheckAuth = ({ isAuthenticated, user, children }) => {
  const location = useLocation();
  const { pathname } = location;
  // Define routes accessible to all unauthenticated users
  const publicRoutes = ["/login", "/register"];

  if (location.pathname === "/") {
    if (!isAuthenticated) {
      return <Navigate to="/shop/home" />;
    } else {
      if (user?.role === "admin" || user?.role === "super-admin") {
        return <Navigate to="/admin/dashboard" />;
      } else {
        return <Navigate to="/shop/home" />;
      }
    }
  }

  const authRoutes = ["purchase-history", "checkout", "account", "admin"];
  // check pathname includes any value of auth routes
  const isAuthRoute = authRoutes.some((route) => pathname.includes(route));
  if (!isAuthenticated && isAuthRoute) {

    return <Navigate to="/auth/login" />;
  }

  if (
    isAuthenticated &&
    (pathname.includes("auth/login") || pathname.includes("auth/register"))
  ) {
    if (user?.role === "admin" || user?.role === "super-admin") {
      return <Navigate to="/admin/dashboard" />;
    } else {
      return <Navigate to="/shop/home" />;
    }
  }

  if (
    isAuthenticated &&
    (location.pathname.includes("auth/login") ||
      location.pathname.includes("auth/register"))
  ) {
    if (user?.role === "admin" || user?.role === "super-admin") {
      return <Navigate to="/admin/dashboard" />;
    } else {
      return <Navigate to="/shop/home" />;
    }
  }

  if (
    isAuthenticated &&
    (user?.role === "admin" || user?.role === "super-admin") &&
    location.pathname.includes("shop")
  ) {
    return <Navigate to="/admin/dashboard" />;
  }

  return <>{children}</>;
};

export default CheckAuth;
