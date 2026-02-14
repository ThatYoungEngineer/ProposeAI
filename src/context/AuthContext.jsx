/* eslint-disable react/prop-types */
import { createContext, useState } from "react";
import { getDefaultValUser } from "../utilities/getStatesDefaultValues";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  let globalFunctionNdStates = {
    isAuthenticated,
    setIsAuthenticated,
  };

  return (
    <AuthContext.Provider value={globalFunctionNdStates}>
      {children}
    </AuthContext.Provider>
  );
};
