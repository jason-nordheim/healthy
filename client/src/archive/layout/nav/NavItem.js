import { useLocation } from "react-router";
import { Link } from "react-router-dom";

export const NavItem = ({ to = "#", label }) => {
  const location = useLocation();
  const active = location.pathname === to;
  return active ? (
    <>
      <li className="nav-item">
        <Link className="nav-link active" aria-current="page" to={to}>
          {label}
        </Link>
      </li>
    </>
  ) : (
    <>
      <li className="nav-item">
        <Link className="nav-link" to={to}>
          {label}
        </Link>
      </li>
    </>
  );
};
