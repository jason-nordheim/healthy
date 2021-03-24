import { createContext } from "react";
import { loginUser, registerUser } from "../util/ApiUtils";

/**
 * Default the context to having an undefined token
 */
export const AuthContext = createContext({
  request_in_progress: false,
  token: undefined,
  error: undefined,
});

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
  switch (action.type) {
    case AUTH_TYPE.LOGIN_REQUEST:
      return {
        ...state,
        request_in_progress: true,
        token: undefined,
        error: undefined,
      };
    case AUTH_TYPE.LOGIN_SUCCESS:
      return {
        ...state,
        request_in_progress: false,
        token: action.payload.token,
      };
    case AUTH_TYPE.LOGIN_FAILURE:
      return {
        ...state,
        request_in_progress: false,
        error: action.payload.error,
      };
    case AUTH_TYPE.LOGOUT_REQUEST:
      return {
        ...state,
        request_in_progress: true,
        token: undefined,
        error: undefined,
      };
    case AUTH_TYPE.LOGOUT_SUCCESS:
      return {
        ...state,
        request_in_progress: false,
        error: undefined,
      };
    case AUTH_TYPE.LOGOUT_FAILURE:
      return {
        ...state,
        request_in_progress: false,
        error: action.payload.error,
      };
    case AUTH_TYPE.REGISTER_REQUEST:
      return {
        ...state,
        request_in_progress: true,
      };
    case AUTH_TYPE.REGISTER_SUCCESS:
      return {
        ...state,
        request_in_progress: false,
      };
    case AUTH_TYPE.REGISTER_FAILURE:
      return {
        ...state,
        request_in_progress: false,
        error: action.payload.error,
      };
    default:
      throw new Error("Invalid Action");
  }
};
