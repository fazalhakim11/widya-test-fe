import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Register from "../pages/register";
import Login from "../pages/login";
import Profile from "../pages/profile";
import Products from "../pages/products"

const router = createBrowserRouter([
  {
    path: "/register",
    element: <Register />,
  }, 
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/products",
    element: <Products />,
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
