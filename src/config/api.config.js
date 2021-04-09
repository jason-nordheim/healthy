const BASE_SERVER_URI = `http://localhost:5000`;

export const API_CONFIG = {
  base: BASE_SERVER_URI,
  routes: {
    user: {
      register: {
        url: `${BASE_SERVER_URI}/api/users`,
        method: "POST",
      },
      getInfo: {
        url: `${BASE_SERVER_URI}/api/users`,
        method: "GET",
      },
      updateInfo: {
        url: `${BASE_SERVER_URI}/api/users`,
        method: "PATCH",
      },
    },
    auth: {
      url: `${BASE_SERVER_URI}/api/login`,
      method: "POST",
    },
  },
};
