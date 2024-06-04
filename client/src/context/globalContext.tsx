import React, { createContext, useContext, useMemo, useState } from "react";

const GlobalContext = createContext();

const GlobalProvider = ({ children }) => {
  const [Auth, setAuth] = useState(false);
  const [token, setToken] = useState(null);
  const updateAuth = (token: string) => {
    setAuth(true);
    setToken(token);
    console.log(`el token se guardo`);
  };

  const value = useMemo(
    () => ({
      token,
      updateAuth,
      Auth,
    }),
    []
  );

  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
};

const useGlobalContext = () => {
  const context = useContext(GlobalContext);

  if (!context) {
    throw new Error(
      "useGlobalContext debe ser utilizado dentro de GlobalProvider"
    );
  }

  return context;
};

export { GlobalProvider, useGlobalContext };
