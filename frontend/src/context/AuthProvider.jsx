import { useState } from "react";
import { AuthContext } from "./AuthContext";

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(() => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));

    return token && user ? { token, user } : null;
  });

  const login = (data) => {
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
    setAuth(data);
  };

  const logout = () => {
    localStorage.clear();
    setAuth(null);
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};