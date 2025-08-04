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
    setLoading(true); // ✅ Start loading
    return createUserWithEmailAndPassword(auth, email, password).finally(() =>
      setLoading(false)
    ); // ✅ Stop loading after operation
  };

  const loginUser = (email: string, password: string) => {
    setLoading(true); // ✅ Start loading
    return signInWithEmailAndPassword(auth, email, password).finally(() =>
      setLoading(false)
    ); // ✅ Stop loading
  };

  const logout = () => {
    setLoading(true); // ✅ Start loading
    return signOut(auth).finally(() => setLoading(false)); // ✅ Stop loading
  };

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        const userInfo = { email: currentUser?.email };

        try {
          const res = await axiosPublic.post("/jwt", userInfo);
          const accessToken = res?.data?.data?.accessToken;
          if (accessToken) {
            localStorage.setItem("accessToken", accessToken);
          }
        } catch (error) {
          console.log("JWT Error:", error);
        } finally {
          setLoading(false); // ✅ Done checking auth state
        }
      } else {
        localStorage.removeItem("accessToken");
        setLoading(false); // ✅ No user
      }
    });

    return () => unSubscribe();
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
