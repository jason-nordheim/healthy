import { createContext, useContext, useReducer } from "react";
import { authActions, authReducer, initialAuthState } from "../reducers";
import { API_ROUTES } from "../config";
import axios from "axios";
export const AuthContext = createContext();

const { registerRequest, registerFailure } = authActions;

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialAuthState);

  // actions
  const login = (user) => {};
  const logout = () => {};
  const register = async (user) => {
    // starting to parse
    dispatch(registerRequest());
    try {
      const response = await axios.post(API_ROUTES.user.createUser.url, {
        ...user,
      });
      console.log({ response });
    } catch (error) {
      console.log({ error });
      console.log({ data: error.response.data });
    }
  };

  const value = { state, login, logout, register };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => useContext(AuthContext);
