import { createContext, useContext, useReducer } from "react";
import { authReducer, initialAuthState } from "../reducers";
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialAuthState);

  // actions
  const login = (user) => {};
  const logout = () => {};
  const register = (user) => {};

  const value = { state, login, logout, register };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => useContext(AuthContext);
