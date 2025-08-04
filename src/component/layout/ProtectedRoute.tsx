import type { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  const token = localStorage.getItem("accessToken");


  if (loading) {
    return <div>loading............</div>;
  }

  if (!token || !user) {
    return (
      <Navigate
        to="/login"
        state={{ from: location }}
        replace={true}
      ></Navigate>
    );
  }

  return children;
};

export default ProtectedRoute;
