import { API_CONFIG } from "../config/api.config";
import { TokenExpiredError } from "../errors/TokenExpiredError";

export const FAILED_TO_FETCH = "TypeError: Failed to fetch";

const parseResponse = async (res) => {
  const data = await res.text();
  if (res.status === 403) {
    throw new TokenExpiredError(JSON.stringify(data));
  } else return JSON.parse(data);
};

/**
 * Get token from API
 * @param {{email{String},password{String}}} user
 * @returns {Promise<Response>}
 */
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

/**
 * Send new user to API
 * @param {{first{String}, last{String}, day{Number}, month: {Number}, year: {number}, email{String}, password{String}}} user
 * @returns {Promise<Response>}
 */
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

/**
 * Get profile associated with token
 * @param {String} token
 * @returns
 */
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

/**
 * Update the user associated with the provided token with the values provided
 * @param {String} token
 * @param {{Object}} fields
 * @returns
 */
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

/**
 * Add a new weight record for the current user
 * @param {String} token
 * @param {Number} kg
 * @returns
 */
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

/**
 * Retrieve all weight records from API
 * @param {String} token
 * @returns
 */
export const getWeights = (token) => {
  const { url, method } = API_CONFIG.routes.weight.getAll;
  return fetch(url, {
    method,
    headers: {
      Authorization: `bearer ${token}`,
      "Content-Type": "application/json",
    },
  }).then(parseResponse);
};

/**
 * Remove weight record from API via its document Id
 * @param {String} token
 * @param {ObjectId} weightId
 * @returns
 */
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

/***
 * Send text to the healthy API to be
 * forwarded to edman api and returned
 */
export const searchFoods = (text) => {
  const { url, method } = API_CONFIG.routes.food.search;
  return fetch(`${url}?query=${text}`, {
    method,
  }).then(parseResponse);
};

export const logFood = (token, food) => {
  const { url, method } = API_CONFIG.routes.food.addFood;
  return fetch(url, {
    method,
    headers: {
      Authorization: `bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ food }),
  }).then(parseResponse);
};

export const getFoods = (token) => {
  const { url, method } = API_CONFIG.routes.food.getFoods;
  return fetch(url, {
    method,
    headers: {
      Authorization: `bearer ${token}`,
      "Content-Type": "application/json",
    },
  }).then(parseResponse);
};
