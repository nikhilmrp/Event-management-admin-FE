"use client";
import { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";

type User = {
  email: string;
  first_name: string;
  id: number;
  last_name: string;
  role: string;
};

type AuthContextType = {
  user: User | null;
  setUser: (user: User | null) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const savedUser = Cookies.get("user");
  const [user, setUser] = useState<User | null>(savedUser ? JSON.parse(savedUser) : null);
  useEffect(() => {
    if (user) {
      Cookies.set("user", JSON.stringify(user));
    }
  }, [user]);
  return <AuthContext.Provider value={{ user, setUser }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within a AuthProvider");
  }
  return context;
};
