import { Route } from "react-router-dom";
import { Navbar } from "./layout";
import { AuthProvider } from "../context";
import { AppRoutes } from "../config";
export const App = () => {
  return (
    <AuthProvider>
      <Navbar />
      {AppRoutes.map((route) => {
        const { component, exact, path } = route;
        return (
          <Route key={path} path={path} render={component} exact={exact} />
        );
      })}
    </AuthProvider>
  );
};
