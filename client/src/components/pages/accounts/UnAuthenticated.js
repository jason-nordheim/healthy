import {
  Switch,
  Route,
  useRouteMatch,
  NavLink,
  Redirect,
} from "react-router-dom";
import { Login } from "./Login";
import { Register } from "./Register";

export const UnAuthenticated = () => {
  let { path, url } = useRouteMatch();
  return (
    <>
      <div className="row">
        <div className="btn-group" role="group" aria-label="Login or register">
          <NavLink
            type="button"
            to={`${url}/login`}
            activeClassName="btn btn-primary"
            className="btn border"
          >
            Login
          </NavLink>
          <NavLink
            type="button"
            to={`${url}/register`}
            activeClassName="btn btn-primary"
            className="btn border"
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
