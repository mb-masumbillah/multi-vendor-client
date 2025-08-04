import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { user, loading } = useAuth();

  const token = localStorage.getItem("accessToken");

  if (loading) {
    return <div>loading............</div>;
  }

  if (!token || !user) {
    return <Navigate to="/login" replace={true}></Navigate>;
  }

  return children;
};

export default ProtectedRoute;
