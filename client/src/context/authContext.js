import { axiosInstance } from "../config";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthContexProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const admin = async (inputs) => {
    const res = await axiosInstance.post("/auth/admin", inputs);
    console.log("authcontext.js:",res.data)
    setCurrentUser(res.data);
  };

  const login = async (inputs) => {
    const res = await axiosInstance.post("/auth/login", inputs);
    setCurrentUser(res.data);
  };

  const logout = async (inputs) => {
    await axiosInstance.post("/auth/logout");
    setCurrentUser(null);
  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, login, logout, admin }}>
      {children}
    </AuthContext.Provider>
  );
}