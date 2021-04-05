import { SERVER_URI } from "../config";

export const loginUser = (user) => {
  return fetch(SERVER_URI.routes.loginUser, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ user }),
  });
};

export const registerUser = (user) => {
  return fetch(SERVER_URI.routes.registerUser, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ user }),
  });
};

export const getProfile = (token) => {
  return fetch(SERVER_URI.routes.getProfile, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `bearer ${token}`,
    },
  });
};

export const updateProfile = (token, fields) => {
  return fetch(SERVER_URI.routes.updateProfile, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `bearer ${token}`,
    },
    body: JSON.stringify(fields),
  });
};
