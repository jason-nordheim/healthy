import { BmiCalculator } from "../feature/BmiCalculator";

export const ToolsPage = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <BmiCalculator />
        </div>
      </div>
    </div>
  );
};
