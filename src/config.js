export const AppName = "Healthy";

const BASE_SERVER_URI = `http://localhost:5000`;

export const SERVER_URI = {
  base: BASE_SERVER_URI,
  routes: {
    registerUser: `${BASE_SERVER_URI}/api/users`,
    loginUser: `${BASE_SERVER_URI}/api/login`,
  },
};
export const MONTHS = [
  { id: 1, name: "January", value: "JAN" },
  { id: 2, name: "February", value: "FEB" },
  { id: 3, name: "March", value: "MAR" },
  { id: 4, name: "April", value: "APR" },
  { id: 5, name: "May", value: "MAY" },
  { id: 6, name: "June", value: "JUN" },
  { id: 7, name: "July", value: "JUL" },
  { id: 8, name: "August", value: "AUG" },
  { id: 9, name: "September", value: "SEP" },
  { id: 10, name: "October", value: "OCT" },
  { id: 11, name: "November", value: "NOV" },
  { id: 12, name: "December", value: "DEC" },
];
