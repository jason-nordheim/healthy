export const AppName = "Healthy";

const BASE_SERVER_URI = `http://localhost:5000`;

export const SERVER_URI = {
  base: BASE_SERVER_URI,
  routes: {
    registerUser: `${BASE_SERVER_URI}/api/users`,
    loginUser: `${BASE_SERVER_URI}/api/login`,
    getProfile: `${BASE_SERVER_URI}/api/users`,
  },
};

export const MONTHS = [
  { id: 1, name: "January", abbr: "JAN" },
  { id: 2, name: "February", abbr: "FEB" },
  { id: 3, name: "March", abbr: "MAR" },
  { id: 4, name: "April", abbr: "APR" },
  { id: 5, name: "May", abbr: "MAY" },
  { id: 6, name: "June", abbr: "JUN" },
  { id: 7, name: "July", abbr: "JUL" },
  { id: 8, name: "August", abbr: "AUG" },
  { id: 9, name: "September", abbr: "SEP" },
  { id: 10, name: "October", abbr: "OCT" },
  { id: 11, name: "November", abbr: "NOV" },
  { id: 12, name: "December", abbr: "DEC" },
];
export const IMPERIAL = {
  WEIGHT: "pounds",
  HEIGHT: "inches",
};

export const METRIC = {
  WEIGHT: "kilograms",
  HEIGHT: "centimeters",
};

export const UOM = {
  IMPERIAL: "imperial",
  METRIC: "metric",
};

export const DEFAULTS = {
  BIRTHDAY: {
    day: 1,
    month: MONTHS[0].id,
    year: 2000,
  },
  USER: {
    first: "",
    last: "",
    email: "",
    password: "",
  },
  UNITS: {
    HEIGHT: IMPERIAL.WEIGHT,
    WEIGHT: IMPERIAL.HEIGHT,
  },
  MEASUREMENTS: {
    HEIGHT: 0,
    WEIGHT: 0,
  },
};
