const BASE_SERVER_URI = `http://localhost:5000`;

export const API_ROUTES = {
  user: {
    createUser: {
      url: `${BASE_SERVER_URI}/api/users`,
      method: `POST`,
      auth: false,
    },
    login: {
      url: `${BASE_SERVER_URI}/api/users/login`,
      method: `POST`,
      auth: false,
    },
    getUserInfo: {
      url: `${BASE_SERVER_URI}/api/users`,
      method: `GET`,
      auth: true,
    },
    updateUserInfo: {
      url: `${BASE_SERVER_URI}/api/users`,
      method: `PATCH`,
      auth: true,
    },
    deleteUser: {
      url: `${BASE_SERVER_URI}/api/users`,
      method: `DELETE`,
      auth: true,
    },
  },
  foods: {
    retrieveAll: {
      url: `${BASE_SERVER_URI}/api/foods`,
      method: `GET`,
      auth: true,
    },
    retrieveById: {
      url: `${BASE_SERVER_URI}/api/foods`,
      params: `_id`,
      method: `GET`,
      auth: true,
    },
    updateById: {
      url: `${BASE_SERVER_URI}/api/foods`,
      params: `_id`,
      method: `PATCH`,
      auth: true,
    },
    deleteById: {
      url: `${BASE_SERVER_URI}/api/foods`,
      params: `_id`,
      method: `DELETE`,
      auth: true,
    },
    saveFood: {
      url: `${BASE_SERVER_URI}/api/foods`,
      method: `POST`,
      auth: true,
    },
    search: {
      url: `${BASE_SERVER_URI}/api/foods`,
      params: `query`,
      method: `GET`,
      auth: true,
    },
  },
  exercises: {
    retrieveAll: {
      url: `${BASE_SERVER_URI}/api/exercises`,
      method: `GET`,
      auth: true,
    },
    createOne: {
      url: `${BASE_SERVER_URI}/api/exercises`,
      method: `POST`,
      auth: true,
    },
    deleteById: {
      url: `${BASE_SERVER_URI}/api/exercises`,
      method: `DELETE`,
      params: "_id",
      auth: true,
    },
    updateById: {
      url: `${BASE_SERVER_URI}/api/exercises`,
      method: `PATCH`,
      params: "_id",
      auth: true,
    },
  },
};
