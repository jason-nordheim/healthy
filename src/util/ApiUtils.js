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
