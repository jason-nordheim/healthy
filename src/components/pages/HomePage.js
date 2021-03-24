import { AppName } from "../../config";

export const HomePage = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <h1 className="display-2">
            Welcome to <u>{AppName}</u>!
          </h1>
        </div>
      </div>
    </div>
  );
};
