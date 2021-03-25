import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import { BmiCalculator } from "../feature/BmiCalculator";

export const ToolsPage = () => {
  const [state, dispatch] = useContext(AuthContext);

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
