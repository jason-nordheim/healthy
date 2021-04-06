import { AppRoutes } from "../../../routes";
import { Brand } from "./Brand";
import { NavItem } from "./NavItem";
import { useContext, useState } from "react";
import { AuthContext } from "../../../context/auth.context";
import { AuthActions } from "../../../context/auth.actions";

export const NavBar = () => {
  const [expanded, setExpanded] = useState(false);
  const [state, dispatch] = useContext(AuthContext);

  const handleLogout = (e) => {
    AuthActions.Logout(dispatch);
  };

  const handleClick = () => {
    setExpanded(!expanded);
  };

  return (
    <nav
      className="navbar navbar-expand-lg navbar-light bg-light"
      role="navigation"
    >
      <div className="container">
        <Brand expanded={expanded} setExpanded={setExpanded} />
        <div
          className={expanded ? "navbar-collapse" : "collapse navbar-collapse"}
          id="navbarSupportedContent"
        >
          <ul className="navbar-nav me-auto mb-2 mb-lg-0" onClick={handleClick}>
            {AppRoutes.map((route) => {
              return (
                <NavItem key={route.path} to={route.path} label={route.label} />
              );
            })}
            {
              // if logged in show a logout item in the list
              state?.token && (
                <li className="nav-item">
                  <span className="nav-link" onClick={handleLogout}>
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
