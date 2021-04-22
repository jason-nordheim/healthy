const BASE_SERVER_URI = `http://localhost:5000`;

const API_CONFIG = {
  routes: {
    users: [
      {
        name: "get profile",
        description: "returns user profile data ",
        request: {
          path: "/api/users",
          method: "GET",
          auth: true,
          query: null,
          body: null,
        },
        response: {
          success: {
            statusCode: 200,
            body: {
              first: String,
              last: String,
              email: String,
              password: String,
              day: Number,
              month: Number,
              year: Number,
              height: Number || undefined,
            },
            format: "application/json",
          },
          clientError: {
            statusCode: 400,
            body: { error: String },
            format: "application/json",
          },
          serverError: {
            statusCode: 500,
            body: { error: String },
            format: "application/json",
          },
        },
      },
      {
        name: "register",
        description: "creates a user account",
        request: {
          path: "/api/users",
          method: "POST",
          auth: false,
          query: null,
          body: {
            first: String,
            last: String,
            email: String,
            password: String,
            day: Number,
            month: Number,
            year: Number,
            height: Number || undefined,
          },
        },
        response: {
          success: {
            statusCode: 201,
            body: "User registered",
            format: "application/json",
          },
          clientError: {
            statusCode: 400,
            body: { error: String },
            format: "application/json",
          },
          serverError: {
            statusCode: 500,
            body: { error: String },
            format: "application/json",
          },
        },
      },
      {
        name: "Delete profile",
        description: "Deletes profile associated with bearer token",
        request: {
          path: "/api/users",
          method: "PATCH",
          auth: true,
          query: null,
          body: {
            first: String || undefined,
            last: String || undefined,
            email: String || undefined,
            password: String || undefined,
            day: Number || undefined,
            month: Number || undefined,
            year: Number || undefined,
            height: Number || undefined,
          },
        },
        response: {
          success: {
            statusCode: 201,
            body: "User updated",
            format: "application/json",
          },
          clientError: {
            statusCode: 400,
            body: { error: String },
            format: "application/json",
          },
          serverError: {
            statusCode: 500,
            body: { error: String },
            format: "application/json",
          },
        },
      },
      {
        name: "delete profile",
        description: "returns user profile data ",
        request: {
          path: "/api/users",
          method: "DELETE",
          auth: true,
          query: null,
          body: null,
        },
        response: {
          success: {
            statusCode: 200,
            body: "User deleted",
            format: "application/json",
          },
          clientError: {
            statusCode: 400,
            body: { error: String },
            format: "application/json",
          },
          serverError: {
            statusCode: 500,
            body: { error: String },
            format: "application/json",
          },
        },
      },
    ],
    foods: [],
    weights: [],
  },
};
