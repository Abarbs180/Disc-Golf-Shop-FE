import jwt_decode from "jwt-decode";
import { useState, useEffect, createContext } from "react";
import useLocalStorageState from "../hooks/useLocalStorageState";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [role, setRole] = useState();
  const [token, setToken] = useLocalStorageState("token", null);
  const [isLoggedIn, setIsLoggedIn] = useLocalStorageState("isLoggedIn", false);

  useEffect(() => {
    if (token) {
      const decodeToken = jwt_decode(token);
      setRole(decodeToken.role);
    }
    return;
  }, [token]);

  return (
    <AuthContext.Provider
      value={{
        token,
        setToken,
        role,
        isLoggedIn,
        setIsLoggedIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
