import { AppName } from "../../config";

export const HomePage = () => {
  return (
    <div className="container">
      <div className="jumbotron">
        <h1 className="display-2 mt-3">{AppName}!</h1>
        <hr class="my-4" />
        <p class="lead">
          Welcome to {AppName}! Let us help you live your bStart on your journey
          to your best self.
        </p>
      </div>
    </div>
  );
};
