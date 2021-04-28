import {
  Switch,
  Route,
  useRouteMatch,
  NavLink,
  Redirect,
  useLocation,
} from "react-router-dom";
import { Login } from "./Login";
import { Register } from "./Register";

export const UnAuthenticated = () => {
  let { path, url } = useRouteMatch();
  let location = useLocation();
  const loginPath = `${url}/login`;
  const registerPath = `${url}/register`;
  console.log({ location, loginPath });
  return (
    <>
      <div className="row">
        <div className="btn-group" role="group" aria-label="Login or register">
          <NavLink
            type="button"
            to={loginPath}
            className={
              /login/.test(location.pathname)
                ? "btn btn-primary border"
                : "btn btn-secondary border"
            }
          >
            Login
          </NavLink>
          <NavLink
            type="button"
            to={registerPath}
            className={
              /register/.test(location.pathname)
                ? "btn btn-primary border"
                : "btn btn-secondary border"
            }
          >
            Register
          </NavLink>
        </div>
      </div>
      <div className="row">
        <Switch>
          <Route path={`${path}/login`}>
            <Login />
          </Route>
          <Route path={`${path}/register`}>
            <Register />
          </Route>
          <Route path="*">
            <Redirect to={`${path}/login`} />
          </Route>
        </Switch>
      </div>
    </>
  );
};
