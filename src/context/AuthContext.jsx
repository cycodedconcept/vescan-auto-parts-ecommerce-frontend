/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useCallback } from "react";
import { login as apiLogin, register as apiRegister } from "../services/authService";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem("vescan_token"));
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem("vescan_user");
    return stored ? JSON.parse(stored) : null;
  });

  const login = useCallback(async (email, password) => {
    const data = await apiLogin(email, password);
    if (data.status === "success") {
      localStorage.setItem("vescan_token", data.token);
      localStorage.setItem("vescan_user", JSON.stringify(data.user));
      setToken(data.token);
      setUser(data.user);
    }
    return data;
  }, []);

  const register = useCallback(async (fields) => {
    const data = await apiRegister(fields);
    if (data.status === "success") {
      localStorage.setItem("vescan_token", data.token);
      localStorage.setItem("vescan_user", JSON.stringify(data.user));
      setToken(data.token);
      setUser(data.user);
    }
    return data;
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("vescan_token");
    localStorage.removeItem("vescan_user");
    setToken(null);
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{ token, user, isAuthenticated: !!token, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
