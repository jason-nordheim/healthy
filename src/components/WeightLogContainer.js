import { useContext, useEffect, useState } from "react";
import { UOM } from "../config/units.config";
import { AuthContext } from "../context/auth.context";
import { AuthActions } from "../context/auth.actions";
import { SelectUnits } from "./forms/select/SelectUnits";
import { SelectWeight } from "./forms/select/SelectWeight";
import {
  addWeight,
  deleteWeight,
  FAILED_TO_FETCH,
  getWeights,
} from "../util/ApiUtils";
import { convert, round } from "../util/UnitUtilities";
import { TiDelete } from "react-icons/ti/index";
import { Redirect } from "react-router";
import { AppRoutes } from "../config/routes";
export const WeightLogContainer = () => {
  const [state, dispatch] = useContext(AuthContext);
  const [kg, setKg] = useState();
  const [uom, setUom] = useState(UOM.IMPERIAL);
  const [weights, setWeights] = useState([]);

  const handleUomChange = (event) => {
    setUom(event.target.value);
  };

  // logout any user if an authenticated
  // action fails
  const handleFetchError = (error) => {
    // eslint-disable-next-line
    if (error == FAILED_TO_FETCH) {
      // disabling since we don't want to compare by reference
      AuthActions.Logout(dispatch);
    } else {
      //showError(error);
      console.error({ error });
    }
  };

  // called using the useEffect hook when the
  // component is mounted
  const fetchUserWeight = () => {
    getWeights(state.token)
      .then((data) => {
        setWeights(data);
      })
      .catch(handleFetchError);
  };

  // get the user weight onload
  // state shouldn't change while component is mounted
  useEffect(() => {
    if (!state?.token) return;
    else fetchUserWeight();
    //eslint-disable-next-line
  }, [state]);

  // submit the new weight record to the API
  // then refresh the weight records
  const handleSubmitWeight = (e) => {
    e.preventDefault();

    // guard clause - make sure we aren't submitting a zero weight
    if (!kg || kg < 0) {
      return alert("Invalid weight value. Please check and try again");
    }

    // send new weight to the API
    addWeight(state.token, kg)
      .then(() => {
        // todo: handle token error
        // todo: handle other errors
        // todo: convert to JSON
        // todo: update the weights
        fetchUserWeight();
      })
      .catch(handleFetchError);
  };

  // event handler function
  const handleDeleteWeight = (weight) => {
    deleteWeight(state.token, weight._id)
      .then(() => fetchUserWeight())
      .catch(handleFetchError);
  };

  return state?.token ? (
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
                        ? `${round(convert.kilogramsToPounds(weight.kg))}`
                        : `${round(weight.kg)}`}
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
  ) : (
    <Redirect to={AppRoutes[0]} />
  );
};
