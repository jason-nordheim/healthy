import { useReducer } from "react";
import { Route } from "react-router";
import {
  AuthContext,
  AuthReducer,
  getInitialState,
} from "../context/auth.context";
import { AppRoutes } from "../routes";
import { NavBar } from "./layout/nav/NavBar";

export const App = () => {
  const [state, dispatch] = useReducer(AuthReducer, getInitialState());
  return (
    <AuthContext.Provider value={[state, dispatch]}>
      <NavBar />
      {AppRoutes.map((route) => (
        <Route
          key={route.path}
          exact={route.exact}
          path={route.path}
          render={route.component}
        />
      ))}
    </AuthContext.Provider>
  );
};
