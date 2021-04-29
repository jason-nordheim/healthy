export const NavToggle = ({ expanded, setExpanded }) => {
  return (
    <button
      className="navbar-toggler"
      type="button"
      data-bs-toggle={expanded ? "expand" : "collapse"}
      data-bs-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded={expanded ? "true" : "false"}
      aria-label="Toggle navigation"
      onClick={() => setExpanded(!expanded)}
    >
      <span className="navbar-toggler-icon"></span>
    </button>
  );
};
