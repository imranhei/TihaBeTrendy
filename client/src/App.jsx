import { useEffect, useState } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import AuthLayout from "./components/auth/layout";
import AuthLogin from "./pages/auth/login";
import AuthRegister from "./pages/auth/register";
import UserLayout from "./components/user-view/layout";
import Home from "./pages/user-view/home";
import NotFound from "./pages/not-found";
import CheckAuth from "./components/common/check-auth";
import { useDispatch, useSelector } from "react-redux";
import { LogIn, User } from "lucide-react";
import { Skeleton } from "./components/ui/skeleton";
import { checkAuth } from "./store/auth-slice";
import AdminLayout from "./components/admin-view/layout";
import AdminDashboard from "./pages/admin-view/dashboard";
import AdminProducts from "./pages/admin-view/products";
import AdminSalesReport from "./pages/admin-view/sales";
import AdminOrders from "./pages/admin-view/order";

function App() {
  const { isAuthenticated, user, isLoading } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();

  // console.log(isAuthenticated, user, isLoading);
  
  useEffect(() => {
    const token = JSON.parse(sessionStorage.getItem("token")); //if i don't have any subdomain
    dispatch(checkAuth(token));
  }, [dispatch]);
  
  if(isLoading){
    return (
      <div className="flex items-center justify-center min-w-screen min-h-screen">
        <div className="flex flex-col space-y-3">
          <Skeleton className="h-[125px] w-[250px] rounded-xl" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col overflow-hidden bg-muted">
      {/* header commponent */}
      <Routes>
        {/* Root path redirection to /shop/home */}
        <Route
          path="/"
          element={
            <CheckAuth
              isAuthenticated={isAuthenticated}
              user={user}
            ></CheckAuth>
          }
        />

        <Route
          path="/auth"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <AuthLayout />
            </CheckAuth>
          }
        >
          <Route path="login" element={<AuthLogin />} />
          <Route path="register" element={<AuthRegister />} />
        </Route>

        <Route
          path="/admin"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <AdminLayout />
            </CheckAuth>
          }
        >
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="sales" element={<AdminSalesReport />} />
          <Route path="orders" element={<AdminOrders />} />
        </Route>

        {/* Public shop routes for users and unauthenticated visitors */}
        <Route
          path="/shop"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <UserLayout />
            </CheckAuth>
          }
        >
          {/* Nested route for Home page */}
          <Route path="home" element={<Home />} />
        </Route>

        {/* Catch-all route for undefined paths */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;

{
  /* product component */
}
{
  /* product details component */
}
{
  /* cart component */
}
{
  /* checkout component */
}
{
  /* profile component */
}
{
  /* order history component */
}
{
  /* order details component */
}
{
  /* user list component */
}
{
  /* user details component */
}
{
  /* product list component */
}
{
  /* product details component */
}
{
  /* product edit component */
}
{
  /* product create component */
}
{
  /* category list component */
}
{
  /* category details component */
}
{
  /* category edit component */
}
{
  /* category create component */
}
{
  /* brand list component */
}
{
  /* brand details component */
}
{
  /* brand edit component */
}
{
  /* brand create component */
}
{
  /* order list component */
}
{
  /* order details component */
}
