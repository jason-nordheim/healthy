import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/auth.context";
import { AuthActions } from "../context/auth.actions";
import { TokenExpiredError } from "../errors/TokenExpiredError";
import { getProfile, updateProfile } from "../util/ApiUtils";

export const useProfile = () => {
  const [state, dispatch] = useContext(AuthContext);
  const [userData, setUserData] = useState({});

  useEffect(() => {
    state?.token &&
      getProfile(state.token)
        .then((data) => {
          setUserData({ ...data });
        })
        .catch((error) => {
          if (typeof error === typeof new TokenExpiredError()) {
            AuthActions.Logout(dispatch);
          }
        });
  }, [state.token, dispatch]);

  const update = (updatedValues) => {
    return updateProfile(state.token, updatedValues)
      .then((res) => {
        return res.json();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return [userData, update];
};
