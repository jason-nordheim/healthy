import { API_CONFIG } from "../config/api.config";
import { TokenExpiredError } from "../errors/TokenExpiredError";

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
  }).then((res) => {
    if (res.status === 403) throw new TokenExpiredError();
    else return res.json();
  });
};

export const getProfile = (token) => {
  const { url, method } = API_CONFIG.routes.user.getInfo;
  return fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `bearer ${token}`,
    },
  }).then((res) => {
    if (res.status === 403) throw new TokenExpiredError();
    else return res.json();
  });
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
  }).then((res) => {
    if (res.status === 403) throw new TokenExpiredError();
    else return res.json();
  });
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
  }).then((res) => {
    if (res.status === 403) throw new TokenExpiredError();
    // convert to json
    else return res.json();
  });
};

export const getWeight = (token) => {
  const { url, method } = API_CONFIG.routes.weight.getAll;
  return fetch(url, {
    method,
    headers: {
      Authorization: `bearer ${token}`,
      "Content-Type": "application/json",
    },
  }).then((res) => {
    if (res.status === 403) throw new TokenExpiredError();
    // convert the body to json
    else return res.json();
  });
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
  }).then((res) => {
    if (res.status === 403) throw new TokenExpiredError();
    // no content to the response
    else return res.text();
  });
};
