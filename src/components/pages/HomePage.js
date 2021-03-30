import { AppName } from "../../config";
import { PageTitle } from "../layout/PageTitle";

export const HomePage = () => {
  return (
    <div className="container">
      <PageTitle text={AppName} />
      <p className="lead">
        Welcome to {AppName}! Let us help you live your bStart on your journey
        to your best self.
      </p>
    </div>
  );
};
