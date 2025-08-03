import { useContext } from "react";
import { AuthContext, type TAuthContext } from "../Provider/authContext";

const useAuth = (): TAuthContext => {
  const auth  = useContext(AuthContext);

  if (!auth) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return auth;
};

export default useAuth;
