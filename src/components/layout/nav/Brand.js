import { AppName } from "../../../config/app.config";

export const Brand = ({ expanded, setExpanded }) => {
  return (
    <>
      <a className="navbar-brand" href="/">
        {AppName}
      </a>
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
    </>
  );
};
