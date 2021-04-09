import { useContext, useState } from "react";
import { UOM } from "../config/units.config";
import { AuthContext } from "../context/auth.context";
import { SelectUnits } from "./forms/select/SelectUnits";
import { SelectWeight } from "./forms/select/SelectWeight";

export const WeightLogContainer = () => {
  const [state, dispatch] = useContext(AuthContext);
  const [kg, setKg] = useState();
  const [uom, setUom] = useState(UOM.IMPERIAL);

  // event handler for changing the UOM
  const handleUomChange = (event) => {
    setUom(event.target.value);
  };

  const handleSubmitWeight = (e) => {
    e.preventDefault();
    console.log(state);
  };

  return (
    <form className="card p-3" onSubmit={handleSubmitWeight}>
      <div className="row">
        <div className="col-sm-auto mb-2">
          <SelectWeight kg={kg} setKg={setKg} uom={uom} />
        </div>
        <div className="d-flex justify-content-between align-items-center">
          <span>
            <SelectUnits uom={uom} onChangeUom={handleUomChange} />
          </span>
          <span>
            <button
              className="btn btn-secondary"
              onClick={handleSubmitWeight}
              onSubmit={handleSubmitWeight}
            >
              Record
            </button>
          </span>
        </div>
      </div>
    </form>
  );
};
