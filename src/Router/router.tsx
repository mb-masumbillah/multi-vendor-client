// src/routes/router.tsx
import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import ContinueWithEmail from "../Pages/Register/ContinueWithEmail";
import RegisterOption from "../Pages/Register/RegisterOption";
import ContinueWithVendor from "../Pages/Register/ContinueWithVendor";
import Home from "../Pages/Home/Home";
import ProtectedRoute from "../component/layout/ProtectedRoute";
import Dashboard from "../Pages/Dashboard/Dashboard";

const router = createBrowserRouter([
  // 🔐 Protected Main App
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <App />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <Home />,
      },
    ],
  },

  //🔐 Protected Dashboard
  {
    path: "dashboard",
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    ),
    children: [],
  },

  // 🔓 Public Routes (no protection)
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
    children: [
      {
        index: true,
        element: <RegisterOption />,
      },
      {
        path: "user",
        element: <ContinueWithEmail />,
      },
      {
        path: "vendor",
        element: <ContinueWithVendor />,
      },
    ],
  },
]);

export default router;
