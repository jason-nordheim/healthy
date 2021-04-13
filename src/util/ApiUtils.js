import { API_CONFIG } from "../config/api.config";
import { TokenExpiredError } from "../errors/TokenExpiredError";

export const FAILED_TO_FETCH = "TypeError: Failed to fetch";

const parseResponse = async (res) => {
  console.log({ res });
  const data = await res.text();
  console.log({ data, res });
  if (res.status === 403) {
    throw new TokenExpiredError(JSON.stringify(data));
  } else return JSON.parse(data);
};

export const loginUser = (user) => {
  const { url, method } = API_CONFIG.routes.auth;
  return fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ user }),
  });
};

export const registerUser = (user) => {
  const { url, method } = API_CONFIG.routes.user.register;
  return fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ user }),
  }).then(parseResponse, parseResponse);
};

export const getProfile = (token) => {
  const { url, method } = API_CONFIG.routes.user.getInfo;
  return fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `bearer ${token}`,
    },
  }).then(parseResponse);
};

export const updateProfile = (token, fields) => {
  const { url, method } = API_CONFIG.routes.user.updateInfo;
  return fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `bearer ${token}`,
    },
    body: JSON.stringify(fields),
  }).then(parseResponse);
};

export const addWeight = (token, kg) => {
  const { url, method } = API_CONFIG.routes.weight.add;
  return fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `bearer ${token}`,
    },
    body: JSON.stringify({ kg, source: "web" }),
  }).then(parseResponse);
};

export const getWeight = (token) => {
  const { url, method } = API_CONFIG.routes.weight.getAll;
  return fetch(url, {
    method,
    headers: {
      Authorization: `bearer ${token}`,
      "Content-Type": "application/json",
    },
  }).then(parseResponse);
};

export const deleteWeight = (token, weightId) => {
  const { url, method } = API_CONFIG.routes.weight.deleteOne;
  return fetch(url, {
    method,
    headers: {
      Authorization: `bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ _id: weightId }),
  }).then(parseResponse);
};
