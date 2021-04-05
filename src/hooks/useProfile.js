import { useEffect, useState } from "react";
import { AuthActions } from "../context/auth.context";
import { TokenExpiredError } from "../errors/TokenExpiredError";
import { getProfile, updateProfile } from "../util/ApiUtils";

export const useProfile = (token, dispatch) => {
  const [userData, setUserData] = useState({});
  useEffect(() => {
    token &&
      getProfile(token)
        .then((res) => {
          if (res.status === 403) throw new TokenExpiredError();
          return res.json();
        })
        .then((data) => {
          setUserData({ ...data });
        })
        .catch((error) => {
          if (typeof error === typeof new TokenExpiredError()) {
            AuthActions.Logout(dispatch);
          }
        });
  }, [token]);

  const update = (updatedValues) => {
    return updateProfile(token, updatedValues)
      .then((res) => {
        return res.json();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return [userData, update];
};
