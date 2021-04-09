import { AppName } from "../../../config/app.config";

export const Brand = () => {
  return (
    <>
      <a className="navbar-brand" href="/">
        {AppName}
      </a>
    </>
  );
};
