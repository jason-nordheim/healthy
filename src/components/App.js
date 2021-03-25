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
      {AppRoutes.map((route) => {
        const { path, exact, component } = route;
        return (
          <Route key={path} exact={exact} path={path} render={component} />
        );
      })}
    </AuthContext.Provider>
  );
};
