import { useContext, useEffect, useState } from "react";
import { UOM } from "../config/units.config";
import { AuthContext } from "../context/auth.context";
import { SelectUnits } from "./forms/select/SelectUnits";
import { SelectWeight } from "./forms/select/SelectWeight";
import { addWeight, deleteWeight, getWeight } from "../util/ApiUtils";
import { convert, round } from "../util/UnitUtilities";
import { TiDelete } from "react-icons/ti/index";
export const WeightLogContainer = () => {
  const [state, dispatch] = useContext(AuthContext);
  const [kg, setKg] = useState();
  const [uom, setUom] = useState(UOM.IMPERIAL);
  const [weights, setWeights] = useState([]);

  // event handler for changing the UOM
  const handleUomChange = (event) => {
    setUom(event.target.value);
  };

  const fetchUserWeight = () => {
    console.log(state);
    getWeight(state.token)
      .then((data) => {
        setWeights(data);
      })
      .catch((error) => {
        console.log({ error });
      });
  };

  useEffect(() => {
    if (!state?.token) return;
    else fetchUserWeight();
  }, [state]);

  const handleSubmitWeight = (e) => {
    e.preventDefault();

    // guard clause - make sure we aren't submitting a zero weight
    if (!kg || kg < 0) {
      return alert("Invalid weight value. Please check and try again");
    }

    // guard clause - make sure we have a token
    if (!state?.token) {
      return alert("You must be logged in to perform this action");
    }

    // send the weight to the API
    addWeight(state.token, kg)
      .then((res) => {
        // todo: handle token error
        // todo: handle other errors
        // todo: convert to JSON
        // todo: update the weights
        console.log({ res });
        fetchUserWeight();
      })
      .catch((error) => {
        // todo: handle error
        console.log({ error });
      });
  };

  const handleDeleteWeight = (weight) => {
    // guard clause - make sure we have a token
    if (!state?.token) {
      return alert("You must be logged in to perform this action");
    }

    deleteWeight(state.token, weight._id)
      .then(() => fetchUserWeight())
      .catch(console.error);
  };

  return (
    <>
      <div className="row mb-3">
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
      </div>
      <div className="row">
        <div className="card p-3">
          <ul className="list-group">
            {weights &&
              weights.map((weight) => {
                return (
                  <li
                    key={weight._id}
                    className="list-group-item d-flex justify-content-between"
                  >
                    <span>
                      {uom === UOM.IMPERIAL
                        ? `${round(convert.kilogramsToPounds(weight.kg), 2)}`
                        : `${round(weight.kg, 2)}`}
                    </span>
                    <span className="align-items-center">
                      <TiDelete
                        style={{ fontSize: "1.5rem" }}
                        onClick={() => handleDeleteWeight(weight)}
                      />
                    </span>
                  </li>
                );
              })}
          </ul>
        </div>
      </div>
    </>
  );
};
