import { AppRoutes } from "../../../routes";
import { Brand } from "./Brand";
import { NavItem } from "./NavItem";
import { useState } from "react";

export const NavBar = () => {
  const [expanded, setExpanded] = useState(false);

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
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {AppRoutes.map((route) => {
              return (
                <NavItem key={route.path} to={route.path} label={route.label} />
              );
            })}
          </ul>
        </div>
      </div>
    </nav>
  );
};
