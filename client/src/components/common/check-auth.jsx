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
        return <Navigate to="/user/home" />;
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
    user?.role === "admin" &&
    location.pathname.includes("shop")
  ) {
    return <Navigate to="/admin/dashboard" />;
  }

  // // Handle public routes: Allow only unauthenticated users or regular users to access them.
  // if (publicRoutes.includes(pathname)) {
  //   console.log("public route");
  //   if (isAuthenticated && (user?.role === "admin" || user?.role === "super-admin")) {
  //     // Redirect admins or super-admins away from public pages to their dashboard
  //     return <Navigate to="/admin/dashboard" />;
  //   }
  //   return <>{children}</>;
  // }

  // // Admin-only routes (visible to admin and super-admin)
  // if (pathname.includes("/admin")) {
  //   console.log(user)
  //   if (user?.role === "admin" || user?.role === "super-admin") {
  //     return <>{children}</>;
  //   } else {
  //     return <Navigate to="/unauth-page" />;
  //   }
  // }

  // if (pathname.includes("/shop")) {
  //   if (isAuthenticated && (user?.role === "admin" || user?.role === "super-admin")) {
  //     return <Navigate to="/admin/dashboard" />;
  //   } else {
  //     return <>{children}</>;
  //   }
  // }

  // // Super-admin exclusive routes (example paths can be "/admin/super")
  // // if (pathname.includes("/super")) {
  // //   if (role === "super-admin") {
  // //     return <>{children}</>;
  // //   } else {
  // //     return <Navigate to="/unauth-page" />;
  // //   }
  // // }

  // // Regular user-specific routes (e.g., purchase history, checkout, account)
  // const userRoutes = ["/purchase-history", "/checkout", "/account"];
  // if (userRoutes.includes(pathname)) {
  //   if (user?.role === "user") {
  //     return <>{children}</>;
  //   } else {
  //     return <Navigate to="/unauth-page" />;
  //   }
  // }

  return <>{children}</>;
};

export default CheckAuth;
