import { useCallback } from "react";
import axios from "axios";
import { API_ROUTES } from "../config";

export const useToken = (token) => {
  const getProfile = useCallback(() => {
    const { url } = API_ROUTES.user.getUserInfo;
    return axios.get(url, {
      headers: {
        Authorization: `bearer ${token}`,
      },
    });
  }, [token]);

  const withToken = { getProfile };
  return withToken;
};
