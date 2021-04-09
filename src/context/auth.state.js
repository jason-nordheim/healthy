import { AppName } from "../config/app.config";
export const getInitialState = () => {};

export const AuthState = {
  initial: () =>
    localStorage.getItem(AppName)
      ? JSON.parse(localStorage.getItem(AppName))
      : {
          request_in_progress: false,
          token: undefined,
          error: undefined,
        },
  save: (state) => {
    localStorage.setItem(AppName, JSON.stringify(state));
    return state;
  },
  restore: () => {
    return JSON.parse(localStorage.getItem(AppName));
  },
};
