export const NavItem = ({ active, href = "#", label }) => {
  return active ? (
    <>
      <li className="nav-item">
        <a className="nav-link active" aria-current="page" href={href}>
          {label}
        </a>
      </li>
    </>
  ) : (
    <>
      <li className="nav-item">
        <a className="nav-link" href={href}>
          {label}
        </a>
      </li>
    </>
  );
};
