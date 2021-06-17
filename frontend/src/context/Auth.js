import React, { useState } from "react";

export const AuthContext = React.createContext("test");

const Auth = ({ children }) => {
  const [token, setToken] = useState(undefined);

  const isAuthenticated = () => {
    if (token) return true;
    return false;
  };

  const logout = (callback) => {
    setToken(undefined);
    callback();
  };

  const authenticate = (token) => {
    setToken(token);
  };

  return (
    <AuthContext.Provider value={{ logout, isAuthenticated, authenticate }}>
      {children}
    </AuthContext.Provider>
  );
};

export default Auth;
