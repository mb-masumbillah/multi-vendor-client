import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import ContinueWithEmail from "../Pages/Register/ContinueWithEmail";
import RegisterOption from "../Pages/Register/RegisterOption";
import ContinueWithVendor from "../Pages/Register/ContinueWithVendor";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [],
  },
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
