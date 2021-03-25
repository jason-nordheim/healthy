import { createContext } from "react";
import { AppName } from "../config";
import { loginUser, registerUser } from "../util/ApiUtils";

export const getInitialState = () => {
  return localStorage.getItem(AppName)
    ? JSON.parse(localStorage.getItem(AppName))
    : {
        request_in_progress: false,
        token: undefined,
        error: undefined,
      };
};

/**
 * Default the context to having an undefined token
 */
export const AuthContext = createContext(getInitialState());

/***
 * Types of Action
 */
const AUTH_TYPE = {
  // login Actions
  LOGIN_REQUEST: "LOGIN_REQUEST",
  LOGIN_SUCCESS: "LOGIN_SUCCESS",
  LOGIN_FAILURE: "LOGIN_FAILURE",
  // Logout Actions
  LOGOUT_REQUEST: "LOGOUT_REQUEST",
  LOGOUT_SUCCESS: "LOGOUT_SUCCESS",
  LOGOUT_FAILURE: "LOGOUT_FAILURE",
  // Register Actions
  REGISTER_REQUEST: "REGISTER_REQUEST",
  REGISTER_SUCCESS: "REGISTER_SUCCESS",
  REGISTER_FAILURE: "REGISTER_FAILURE",
};

const Login = (user, dispatch) => {
  // request started
  dispatch({ type: AUTH_TYPE.LOGIN_REQUEST, payload: null });
  return loginUser(user)
    .then((res) => res.json())
    .then((data) => {
      if (data.error) {
        dispatch({
          type: AUTH_TYPE.LOGIN_FAILURE,
          payload: { error: data.error },
        });
      }
      console.log("data", data);
      dispatch({
        type: AUTH_TYPE.LOGIN_SUCCESS,
        payload: { token: data.token },
      });
    })
    .catch((error) => {
      // todo: have not found scenario in which this is invoked
      console.error("LoginError", error);
      dispatch({
        type: AUTH_TYPE.LOGIN_FAILURE,
        payload: { error },
      });
    });
};

const Logout = (dispatch) => {
  try {
    dispatch({ type: AUTH_TYPE.LOGOUT_REQUEST });
    dispatch({ type: AUTH_TYPE.LOGOUT_SUCCESS });
  } catch (error) {
    // todo: this is never triggered currently
    dispatch({ type: AUTH_TYPE.LOGIN_FAILURE });
  }
};

const Register = (user, dispatch) => {
  dispatch({ type: AUTH_TYPE.REGISTER_REQUEST });

  registerUser(user)
    .then((res) => res.json())
    .then((data) => {
      if (data.error) {
        dispatch({
          type: AUTH_TYPE.REGISTER_FAILURE,
          payload: { error: data.error },
        });
      } else {
        dispatch({ type: AUTH_TYPE.REGISTER_SUCCESS, payload: { data } });

        // start the login process
        Login(user, dispatch);
      }
    })
    .catch((error) => {
      // todo: this needs to be tested
      console.error(error);
      return dispatch({
        type: AUTH_TYPE.REGISTER_FAILURE,
        payload: { error },
      });
    });
};

export const AuthActions = {
  Login,
  Logout,
  Register,
};

export const AuthReducer = (state, action) => {
  let newState;
  const saveState = (state) => {
    localStorage.setItem(AppName, JSON.stringify(state));
  };
  switch (action.type) {
    case AUTH_TYPE.LOGIN_REQUEST:
      newState = {
        ...state,
        request_in_progress: true,
        token: undefined,
        error: undefined,
      };
      saveState(newState);
      return newState;
    case AUTH_TYPE.LOGIN_SUCCESS:
      newState = {
        ...state,
        request_in_progress: false,
        token: action.payload.token,
      };
      saveState(newState);
      return newState;
    case AUTH_TYPE.LOGIN_FAILURE:
      newState = {
        ...state,
        request_in_progress: false,
        error: action.payload.error,
      };
      saveState(newState);
      return newState;
    case AUTH_TYPE.LOGOUT_REQUEST:
      newState = {
        ...state,
        request_in_progress: true,
        token: undefined,
        error: undefined,
      };
      saveState(newState);
      return newState;
    case AUTH_TYPE.LOGOUT_SUCCESS:
      newState = {
        ...state,
        request_in_progress: false,
        error: undefined,
      };
      saveState(newState);
      return newState;
    case AUTH_TYPE.LOGOUT_FAILURE:
      newState = {
        ...state,
        request_in_progress: false,
        error: action.payload.error,
      };
      saveState(newState);
      return newState;
    case AUTH_TYPE.REGISTER_REQUEST:
      newState = {
        ...state,
        request_in_progress: true,
      };
      saveState(newState);
      return newState;
    case AUTH_TYPE.REGISTER_SUCCESS:
      newState = {
        ...state,
        request_in_progress: false,
      };
      saveState(newState);
      return newState;
    case AUTH_TYPE.REGISTER_FAILURE:
      newState = {
        ...state,
        request_in_progress: false,
        error: action.payload.error,
      };
      saveState(newState);
      return newState;
    default:
      throw new Error("Invalid Action");
  }
};
