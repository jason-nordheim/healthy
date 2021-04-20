import { useReducer } from "react";
import { Route } from "react-router";
import { AuthContext, AuthReducer } from "../context/auth.context";
import { AuthState } from "../context/auth.state";
import { AppRoutes } from "../config/routes";
import { NavBar } from "./layout/nav/NavBar";

export const App = () => {
  const [authState, authDispatch] = useReducer(
    AuthReducer,
    AuthState.initial()
  );

  return (
    <AuthContext.Provider value={[authState, authDispatch]}>
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
