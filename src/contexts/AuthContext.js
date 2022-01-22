import { createContext } from "react";
import useLocalStorageState from "../hooks/useLocalStorageState";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [token, setToken] = useLocalStorageState("token", null);
  const [isLoggedIn, setIsLoggedIn] = useLocalStorageState("isLoggedIn", false);

  return (
    <AuthContext.Provider
      value={{
        token,
        setToken,
        isLoggedIn,
        setIsLoggedIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
