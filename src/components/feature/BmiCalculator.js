import { useEffect, useState } from "react";
import {
  DEFAULT_MEASUREMENTS,
  IMPERIAL,
  METRIC,
  UNITS,
  UOM,
} from "../../config";
import { convert } from "../../util/UnitUtilities";

import { BmiChart } from "./BmiChart";

export const BmiCalculator = () => {
  const [values, setValues] = useState(DEFAULT_MEASUREMENTS);
  const [measurements, setMeasurements] = useState(DEFAULT_MEASUREMENTS);
  const [uom, setUom] = useState(UOM.imperial);
  const [units, setUnits] = useState(UNITS.DEFAULT);

  // update the units of measure
  useEffect(() => {
    if (uom === UOM.metric) {
      setUnits(UNITS.METRIC);
    } else {
      setUnits(UNITS.IMPERIAL);
    }
  }, [uom]);

  // event handler for changing the UOM
  const handleUomChange = (event) => {
    setUom(event.target.value);
  };

  // function to determine if the chart should be shown
  const showChart = () => {
    const MIN_KG = 14; // 30.8 pounds
    const MIN_CM = 40; // 15.75 inches
    if (!values) return false;
    else if (!values.height) return false;
    else if (!values.weight) return false;
    else if (!values.height > MIN_CM) return false;
    else if (!values.weight > MIN_KG) return false;
    else return true;
  };

  // event handler to update the form values whenever they change
  const handleMeasurementChange = (event) => {
    const { name, value } = event.target;

    // convert the values to imperial if needed
    if (uom === UOM.imperial) {
      if (name === "height") {
        const num = +value;
        const cm = convert.inchesToCentimeters(num);
        const updatedVals = { ...values, [name]: cm };
        setValues(updatedVals);
      } else if (name === "weight") {
        const num = +value;
        const kg = convert.poundsToKilograms(num);
        const updateVals = { ...value, [name]: kg };
        setValues(updateVals);
      } else {
        setValues({ ...values, [name]: value });
      }
    }

    // always update measurements values in state
    setMeasurements({ ...measurements, [name]: value });
  };

  return (
    <form className="container" onSubmit={(e) => e.preventDefault()}>
      <div className="row">
        <div className="col">
          <h3 className="text-center p-3">BMI Calculator</h3>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <span className="input-group p-3">
            <label className="input-group-text" htmlFor="uom">
              Unit of Measure
            </label>
            <select
              className="form-select"
              aria-label="Unit of Measurement"
              name="uom"
              id="uom"
              value={uom}
              onChange={handleUomChange}
            >
              <option
                value={UOM.imperial}
                className={uom === UOM.imperial ? "selected" : ""}
              >
                {UOM.imperial}
              </option>
              <option
                value={UOM.metric}
                className={uom === UOM.metric ? "selected" : ""}
              >
                {UOM.metric}
              </option>
            </select>
          </span>
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
              value={measurements.weight}
              onChange={handleMeasurementChange}
            />
            <select
              className="form-select"
              name="w_units"
              id="w_units"
              value={units.weight}
              readOnly
              disabled
              aria-readonly={"true"}
            >
              <option
                value={METRIC.weight}
                className={units.weight === METRIC.weight ? "selected" : ""}
              >
                {METRIC.weight}
              </option>
              <option
                value={IMPERIAL.weight}
                className={units.weight === IMPERIAL.weight ? "selected" : ""}
              >
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
                value={measurements.height}
                onChange={handleMeasurementChange}
              />
              <select
                className="form-select"
                name="h_units"
                id="h_units"
                readOnly
                disabled
                value={units.height}
              >
                <option
                  value={METRIC.height}
                  className={units.height === METRIC.height ? "selected" : ""}
                >
                  {METRIC.height}
                </option>
                <option
                  value={IMPERIAL.height}
                  className={units.height === IMPERIAL.height ? "selected" : ""}
                >
                  {IMPERIAL.height}
                </option>
              </select>
            </span>
          </div>
        </div>
      </div>
      {showChart() && (
        <BmiChart height={values.height} weight={values.weight} />
      )}
      <div className="row">
        <div className="col">
          {/* todo:  */}
          <button>Record</button>
        </div>
      </div>
    </form>
  );
};
