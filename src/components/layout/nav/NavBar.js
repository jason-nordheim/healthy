import { AppRoutes } from "../../../routes";
import { Brand } from "./Brand";
import { NavItem } from "./NavItem";

export const NavBar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <Brand />
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
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
