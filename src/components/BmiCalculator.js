import { useState } from "react";
import { BmiUtils, convert } from "../util/BmiUtils";

import { BmiChart } from "./BmiChart";
export const BmiCalculator = () => {
  const [state, setState] = useState({
    weight: 0,
    w_units: "lb",
    height: 0,
    h_units: "in",
    bmi: undefined,
    category: undefined,
    kg: undefined,
    cm: undefined,
  });
  const { weight, w_units, height, h_units, category } = state;
  const handleSubmit = (event) => {
    event.preventDefault();
    const cm = h_units === "in" ? convert.inchesToCentimeters(height) : height;
    const kg = w_units === "lb" ? convert.poundsToKilograms(weight) : weight;
    const m = cm / 100;
    const bmi = BmiUtils.calculateBmi(kg, m);
    setState({ ...state, bmi, category, cm, kg });
  };
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setState({ ...state, [name]: value });
  };

  return (
    <form className="container" onSubmit={handleSubmit}>
      <div className="row">
        <div className="col">
          <h3 className="text-center p-3">BMI Calculator</h3>
        </div>
      </div>

      <div className="row">
        <div className="col">
          <span className="input-group p-3">
            <label className="input-group-text" htmlFor="weight">
              Weight
            </label>
            <input
              className="form-control"
              type="number"
              name="weight"
              id="weight"
              value={weight}
              onChange={handleInputChange}
            />
            <select
              className="form-select"
              aria-label="Default select example"
              name="w_units"
              id="w_units"
              value={w_units}
              onChange={handleInputChange}
            >
              <option value="kg" className={w_units === "kg" ? "selected" : ""}>
                kilograms
              </option>
              <option value="lb" className={w_units === "lb" ? "selected" : ""}>
                pounds
              </option>
            </select>
          </span>
        </div>
        <div className="row">
          <div className="col">
            <span className="input-group p-3">
              <label className="input-group-text" htmlFor="height">
                Height
              </label>
              <input
                className="form-control"
                type="number"
                name="height"
                id="height"
                value={height}
                onChange={handleInputChange}
              />
              <select
                className="form-select"
                name="h_units"
                id="h_units"
                value={h_units}
                onChange={handleInputChange}
              >
                <option
                  value="in"
                  className={h_units === "in" ? "selected" : ""}
                >
                  inches
                </option>
                <option
                  value="cm"
                  className={h_units === "cm" ? "selected" : ""}
                >
                  centimeters
                </option>
              </select>
            </span>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <span className="input-group p-3">
            <button className="btn btn-primary" onClick={handleSubmit}>
              Submit
            </button>
          </span>
        </div>
      </div>
      {state.cm && state.kg && <BmiChart height={state.cm} weight={state.kg} />}
    </form>
  );
};
