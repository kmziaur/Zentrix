import React, { useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Verify from "./pages/Verify";
import VerifyEmail from "./pages/VerifyEmail";

import { useDispatch } from "react-redux";
import { setUser } from "./redux/userSlice";

import Profile from "./pages/Profile";
import Products from "./pages/Products";
import Cart from "./pages/Cart";

import Dashboard from "./pages/Dashboard";
import AdminSales from "./pages/admin/AdminSales";
import AddProduct from "./pages/admin/AddProduct";
import AdminProduct from "./pages/admin/AdminProduct";
import AdminOrders from "./pages/admin/AdminOrders";
import ShowUserOrders from "./pages/admin/ShowUserOrders";
import AdminUsers from "./pages/admin/AdminUsers";
import UserInfo from "./pages/admin/UserInfo";

import ProtectedRoute from "./components/ProtectedRoute";
import SingleProduct from "./pages/SingleProduct";

const router = createBrowserRouter([
  //Public routes 
  {
    path: "/",
    element: (
      <>
        <Navbar />
        <Home />
      </>
    ),
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/verify",
    element: <Verify />,
  },
  {
    path: "/verify/:token",
    element: <VerifyEmail />,
  },

  //user protected routes
  {
    path: "/profile/:userId",
    element: (
      <ProtectedRoute>
        <Navbar />
        <Profile />
      </ProtectedRoute>
    ),
  },
  {
    path: "/cart",
    element: (
      <ProtectedRoute>
        <Navbar />
        <Cart />
      </ProtectedRoute>
    ),
  },
  {
    path: "/products",
    element: (
      <>
        <Navbar />
        <Products />
      </>
    ),
  },
  {
    path: "/products/:id",
    element: (
      <>
        <Navbar />
        <SingleProduct />
      </>
    ),
  },

  // admin protected routes
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute adminOnly={true}>
        <Dashboard />
      </ProtectedRoute>
    ),
    children: [
      { path: "sales", element: <AdminSales /> },
      { path: "add-product", element: <AddProduct /> },
      { path: "products", element: <AdminProduct /> },
      { path: "orders", element: <AdminOrders /> },
      { path: "users/orders/:userId", element: <ShowUserOrders /> },
      { path: "user", element: <AdminUsers /> },
      { path: "user/:id", element: <UserInfo /> },
    ],
  },
]);

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser && storedUser !== "undefined") {
      try {
        const parsedUser = JSON.parse(storedUser);
        dispatch(setUser(parsedUser));
      } catch (error) {
        console.log("Invalid user in localStorage");
        localStorage.removeItem("user");
      }
    }
  }, [dispatch]);

  return <RouterProvider router={router} />;
};

export default App;