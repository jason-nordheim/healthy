import { TokenExpiredError } from "../errors/TokenExpiredError";
import { getProfile } from "../util/ApiUtils";
import { AuthActions } from "./auth.actions";
import { USER_TYPE } from "./user.type";

const GetProfile = (userToken, userDispatch, authDispatch) => {
  /** make sure we a token */
  if (!userToken) {
    userDispatch({
      type: USER_TYPE.PROFILE_FAILURE,
      payload: { error: "No token" },
    });
  }

  /* try to use the token to get data */
  userDispatch({ type: USER_TYPE.PROFILE_REQUEST, payload: null });
  return getProfile(userToken)
    .then((res) => {
      if (res.status === 403) throw new TokenExpiredError();
      return res.json();
    })
    .then((data) => {
      userDispatch({ type: USER_TYPE.PROFILE_SUCCESS, payload: { ...data } });
    })
    .catch((error) => {
      if (typeof error === typeof new TokenExpiredError()) {
        AuthActions.Logout(authDispatch);
      } else {
        userDispatch({ type: USER_TYPE.PROFILE_FAILURE, payload: { error } });
      }
    });
};

export const UserActions = {
  GetProfile,
};
