import { createContext, useContext, useReducer } from "react";
import { authActions, authReducer, initialAuthState } from "../reducers";
import { API_ROUTES } from "../config";
import axios from "axios";
export const AuthContext = createContext();

const {
  registerRequest,
  registerFailure,
  registerSuccess,
  loginRequest,
  loginSuccess,
  loginFailure,
} = authActions;

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialAuthState);

  // actions
  const login = async (user) => {
    const { url } = API_ROUTES.user.login;
    dispatch(loginRequest());
    try {
      const response = await axios.post(url, { ...user });
      if (response.status === 201 && response.data?.token) {
        dispatch(loginSuccess(response.data.token));
      } else {
        const info = JSON.stringify(response.data);
        dispatch(loginFailure("Failed to login: " + info));
      }
      console.log({ response });
    } catch (error) {
      console.log({ error });
    }
  };
  const logout = () => {};
  const register = async (user) => {
    const { url } = API_ROUTES.user.createUser;
    // starting to parse
    dispatch(registerRequest());
    try {
      const response = await axios.post(url, { ...user });

      if (response.status === 201) {
        dispatch(registerSuccess());
        // pause a moment to let the transaction finish
        setTimeout(200, login(user));
      }
    } catch (error) {
      // something went wrong
      if (error.response.data.code === 11000) {
        // duplicate key, loop through displaying which keys have been use
        let message = "Error: ";
        const errorObjKeys = Object.keys(error.response.data.keyPattern);
        errorObjKeys.forEach(
          (errorKey) => (message += ` ${errorKey} already used.`)
        );
        dispatch(registerFailure(message));
      } else {
        // unknown error
        const details = JSON.stringify(error.response.data);
        dispatch(registerFailure("Unknown Error: " + details));
      }
    }
  };
  const actions = { login, logout, register };
  const value = { state, actions };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => useContext(AuthContext);
