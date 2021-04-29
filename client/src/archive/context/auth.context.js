import { createContext } from "react";
import { AuthState } from "./auth.state";
import { AUTH_TYPE } from "./auth.type";

/**
 * Default the context to having an undefined token
 */
export const AuthContext = createContext(AuthState.initial());

export const AuthReducer = (state, action) => {
  let newState;
  switch (action.type) {
    case AUTH_TYPE.LOGIN_REQUEST:
      newState = {
        ...state,
        request_in_progress: true,
        token: undefined,
        error: undefined,
      };
      break;
    case AUTH_TYPE.LOGIN_SUCCESS:
      newState = {
        ...state,
        request_in_progress: false,
        token: action.payload.token,
      };
      break;
    case AUTH_TYPE.LOGIN_FAILURE:
      newState = {
        ...state,
        token: undefined,
        request_in_progress: false,
        error: action.payload.error,
      };
      break;
    case AUTH_TYPE.LOGOUT_REQUEST:
      newState = {
        ...state,
        request_in_progress: true,
        error: undefined,
      };
      break;
    case AUTH_TYPE.LOGOUT_SUCCESS:
      newState = {
        ...state,
        token: undefined,
        request_in_progress: false,
        error: undefined,
      };
      break;
    case AUTH_TYPE.LOGOUT_FAILURE:
      newState = {
        ...state,
        request_in_progress: false,
        error: action.payload.error,
      };
      break;
    case AUTH_TYPE.REGISTER_REQUEST:
      newState = {
        ...state,
        request_in_progress: true,
      };
      break;

    case AUTH_TYPE.REGISTER_SUCCESS:
      newState = {
        ...state,
        request_in_progress: false,
      };
      break;
    case AUTH_TYPE.REGISTER_FAILURE:
      newState = {
        ...state,
        request_in_progress: false,
        error: action.payload.error,
      };
      break;
    default:
      throw new Error("Invalid Action");
  }
  AuthState.save(newState);
  return newState;
};
