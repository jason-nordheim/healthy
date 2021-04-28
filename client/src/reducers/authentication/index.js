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

const initialState = {
  token: undefined,
  pendingRequest: false,
  error: undefined,
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
  switch (action.type) {
    // LOGIN --------------------------
    case TYPES.LOGIN_REQUEST:
      return { ...state, pendingRequest: true, error: undefined };
    case TYPES.LOGIN_SUCCESS:
      return { ...state, pendingRequest: false, token: action.payload.token };
    case TYPES.LOGIN_FAILURE:
      return { ...state, pendingRequest: false, error: action.payload.error };
    // LOGOUT --------------------------
    case TYPES.LOGOUT_REQUEST:
      return { ...state, pendingRequest: true, error: undefined };
    case TYPES.LOGOUT_SUCCESS:
      return { ...state, pendingRequest: false, token: undefined };
    case TYPES.LOGOUT_FAILURE:
      return { ...state, pendingRequest: false, error: action.payload.error };
    // REGISTER --------------------------
    case TYPES.REGISTER_REQUEST:
      return { ...state, pendingRequest: true, error: undefined };
    case TYPES.REGISTER_SUCCESS:
      return { ...state, pendingRequest: false };
    case TYPES.REGISTER_FAILURE:
      return { ...state, pendingRequest: false, error: action.payload.error };
    default:
      throw new Error("Invalid Action");
  }
};

export { TYPES, reducer, initialState };
