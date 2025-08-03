import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  type User,
} from "firebase/auth";
import { useEffect, useState, type ReactNode } from "react";
import { auth } from "../firebase.config";
import { AuthContext, type TAuthContext } from "./authContext";
import useAxiosPublic from "../hooks/useAxiosPublic";

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const axiosPublic = useAxiosPublic();

  const createUser = (email: string, password: string) => {
    setLoading(false);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const loginUser = (email: string, password: string) => {
    setLoading(false);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = () => {
    setLoading(false);
    return signOut(auth);
  };

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        const userInfo = { email: currentUser?.email };

        await axiosPublic
          .post("/jwt", userInfo)
          .then((res) => {
            console.log(res?.data?.data?.accessToken);
            if (res?.data?.data?.accessToken) {
              localStorage.setItem("accessToken", res?.data?.data?.accessToken);
              setLoading(false);
            }
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        localStorage.removeItem("accessToken");
        setLoading(false);
      }
    });

    return () => {
      return unSubscribe();
    };
  }, [axiosPublic]);

  const authInfo: TAuthContext = {
    user,
    loading,

    createUser,
    loginUser,
    logout,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
