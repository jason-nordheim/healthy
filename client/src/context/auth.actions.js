import { loginUser, registerUser } from "../util/ApiUtils";
import { AUTH_TYPE } from "./auth.type";

const Login = (user, dispatch) => {
  // request started
  dispatch({ type: AUTH_TYPE.LOGIN_REQUEST, payload: null });
  return loginUser(user)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      if (data.error) {
        console.log("LoginError", data);
        dispatch({
          type: AUTH_TYPE.LOGIN_FAILURE,
          payload: { error: data.error },
        });
      }
      dispatch({
        type: AUTH_TYPE.LOGIN_SUCCESS,
        payload: { token: data.token },
      });
    })
    .catch((error) => {
      // todo: have not found scenario in which this is invoked
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
