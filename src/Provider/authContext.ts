/* eslint-disable @typescript-eslint/no-explicit-any */
import type { User, UserCredential } from "firebase/auth";
import { createContext } from "react";

export type TAuthContext = {
  user: User | null;
  loading: boolean;
  createUser: (email: string, password: string) => Promise<any>;
  loginUser: (email: string, password: string) => Promise<any>;
  google: () => Promise<UserCredential>;
  logout: () => Promise<void>;
};

export const AuthContext = createContext<TAuthContext | undefined>(undefined);
