import { Route, Switch } from "react-router";
import { AppRoutes } from "../routes";
import { NavBar } from "./layout/nav/NavBar";

export const App = () => {
  return (
    <>
      <NavBar />

      {AppRoutes.map((route) => {
        const { path, exact, component } = route;
        return (
          <Route key={path} exact={exact} path={path} render={component} />
        );
      })}
    </>
  );
};
