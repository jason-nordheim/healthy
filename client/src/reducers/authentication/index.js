import { CONSTANTS } from "../../config";

const TYPES = {
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

const ACTIONS = {
  // login
  loginRequest: () => ({ type: TYPES.LOGIN_REQUEST }),
  loginSuccess: (token) => ({ type: TYPES.LOGIN_SUCCESS, payload: { token } }),
  loginFailure: (error) => ({ type: TYPES.LOGIN_FAILURE, payload: { error } }),

  registerRequest: () => ({ type: TYPES.REGISTER_REQUEST }),
  registerSuccess: () => ({ type: TYPES.REGISTER_SUCCESS }),
  registerFailure: (error) => ({
    type: TYPES.REGISTER_FAILURE,
    payload: { error },
  }),

  logoutRequest: () => ({ type: TYPES.LOGOUT_REQUEST }),
  logoutSuccess: () => ({ type: TYPES.LOGIN_SUCCESS }),
  logoutFailure: (error) => ({
    type: TYPES.LOGOUT_FAILURE,
    payload: { error },
  }),
};

const AuthState = {
  save: (state) => {
    localStorage.setItem(CONSTANTS.APP_NAME, JSON.stringify(state));
  },
  restore: () => {
    return JSON.parse(localStorage.getItem(CONSTANTS.APP_NAME));
  },
  initial: () =>
    JSON.parse(localStorage.getItem(CONSTANTS.APP_NAME)) || {
      token: undefined,
      pendingRequest: false,
      error: undefined,
    },
};

/**
 * Reducer function for authentication.
 * state consists of `token`, `error` and `pendingRequest` properties
 *    -> `pendingRequest` indicates that a request is in progress
 *    -> `token` is the signed JWT token received from the backend
 *    -> `error`
 *      -> cleared (set to `undefined`) at the start of each request
 *      -> if value is present, the last transaction failed, and the error
 *          property will have a string value representing the message
 * @param {Object} state
 * @param {Object} action
 * @returns
 */
const reducer = (state, action) => {
  let newState = { ...state } 
  switch (action.type) {
    // LOGIN --------------------------
    case TYPES.LOGIN_REQUEST:
      newState = { ...state, pendingRequest: true, error: undefined };
      break;
    case TYPES.LOGIN_SUCCESS:
      newState = {
        ...state,
        pendingRequest: false,
        token: action.payload.token,
      };
      break;
    case TYPES.LOGIN_FAILURE:
      newState = {
        ...state,
        pendingRequest: false,
        error: action.payload.error,
      };
      break;
    // LOGOUT --------------------------
    case TYPES.LOGOUT_REQUEST:
      newState = {
        ...state,
        pendingRequest: true,
        error: undefined,
        token: undefined,
      };
      break;
    case TYPES.LOGOUT_SUCCESS:
      newState = {
        ...state,
        pendingRequest: false,
      };
      break;
    case TYPES.LOGOUT_FAILURE:
      newState = {
        ...state,
        pendingRequest: false,
        error: action.payload.error,
      };
      break;
    // REGISTER --------------------------
    case TYPES.REGISTER_REQUEST:
      newState = {
        ...state,
        pendingRequest: true,
        error: undefined,
      };
      break;
    case TYPES.REGISTER_SUCCESS:
      newState = {
        ...newState,
        pendingRequest: false,
      };
      break;
    case TYPES.REGISTER_FAILURE:
      newState = {
        ...state,
        pendingRequest: false,
        error: action.payload.error,
      };
      break;
    default:
      throw new Error("Invalid Action");
  }
  AuthState.save(newState);
  return newState;
};

export { TYPES, reducer, AuthState, ACTIONS };
