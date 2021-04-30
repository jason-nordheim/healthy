import { useState } from "react";
import { Brand } from "./Brand";
import { NavToggle } from "./NavToggle";
import { NavItem } from "./NavItem";
import { AppRoutes } from "../../../config";
import { useAuthContext } from "../../../context/context.auth";
import { Redirect } from "react-router-dom";
export const Navbar = () => {
  const [expanded, setExpanded] = useState(false);
  const { state, actions } = useAuthContext();
  return (
    <nav
      className="navbar navbar-expand-lg navbar-light bg-light"
      role="navigation"
    >
      <div className="container">
        <Brand />
        <NavToggle expanded={expanded} setExpanded={setExpanded} />
        <div
          className={expanded ? "navbar-collapse" : "collapse navbar-collapse"}
          id="navbarSupportedContent"
        >
          <ul
            className="navbar-nav me-auto mb-2 mb-lg-0"
            onClick={() => setExpanded(!expanded)}
          >
            {AppRoutes.map((route) => {
              // if there is a token, show all routes
              return state.token ? (
                <NavItem key={route.path} to={route.path} label={route.label} />
              ) : (
                // no user, only show routes that do not require a user
                !route.authOnly && (
                  <NavItem
                    key={route.path}
                    to={route.path}
                    label={route.label}
                  />
                )
              );
            })}
            {
              // if logged in show a logout item in the list
              state?.token && (
                <li className="nav-item">
                  <span
                    className="nav-link"
                    onClick={() => actions.logout() && <Redirect to="/" />}
                  >
                    Logout
                  </span>
                </li>
              )
            }
          </ul>
        </div>
      </div>
    </nav>
  );
};
