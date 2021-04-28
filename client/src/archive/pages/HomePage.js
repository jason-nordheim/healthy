import { AppName } from "../../config/config.";
import { PageTitle } from "../layout/PageTitle";

export const HomePage = () => {
  return (
    <div className="container">
      <PageTitle text={AppName} />
      <p className="lead">Welcome to {AppName}!</p>
      <p>Begin your journey toward a happier, healthier life today.</p>
    </div>
  );
};
