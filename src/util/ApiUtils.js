import { API_CONFIG } from "../config/api.config";

export const loginUser = (user) => {
  return fetch(API_CONFIG.routes.auth.url, {
    method: API_CONFIG.routes.auth.method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ user }),
  });
};

export const registerUser = (user) => {
  return fetch(API_CONFIG.routes.user.register.url, {
    method: API_CONFIG.routes.user.register.method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ user }),
  });
};

export const getProfile = (token) => {
  return fetch(API_CONFIG.routes.user.getInfo.url, {
    method: API_CONFIG.routes.user.getInfo.method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `bearer ${token}`,
    },
  });
};

export const updateProfile = (token, fields) => {
  return fetch(API_CONFIG.routes.user.updateInfo.url, {
    method: API_CONFIG.routes.user.updateInfo.method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `bearer ${token}`,
    },
    body: JSON.stringify(fields),
  });
};

export const addWeight = (token, kg) => {
  return fetch(API_CONFIG.routes.weight.add.url, {
    method: API_CONFIG.routes.weight.add.method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `bearer ${token}`,
    },
    body: JSON.stringify({ kg, source: "web" }),
  });
};
