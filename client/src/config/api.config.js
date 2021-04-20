const BASE_SERVER_URI = `http://localhost:5000`;

export const API_CONFIG = {
  base: BASE_SERVER_URI,
  routes: {
    auth: {
      url: `${BASE_SERVER_URI}/api/login`,
      method: "POST",
    },
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
    weight: {
      add: {
        url: `${BASE_SERVER_URI}/api/weights`,
        method: "POST",
      },
      getAll: {
        url: `${BASE_SERVER_URI}/api/weights`,
        method: "GET",
      },
      deleteOne: {
        url: `${BASE_SERVER_URI}/api/weights`,
        method: "DELETE",
      },
    },
    food: {
      search: {
        url: `${BASE_SERVER_URI}/api/foods/search`,
        method: "GET",
      },
      addFood: {
        url: `${BASE_SERVER_URI}/api/foods`,
        method: "POST",
      },
      getFoods: {
        url: `${BASE_SERVER_URI}/api/foods`,
        method: "GET",
      },
    },
  },
};
