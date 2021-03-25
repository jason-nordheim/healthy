import { useEffect, useState } from "react";

import { BmiChart } from "./BmiChart";

const UOM = {
  imperial: "imperial",
  metric: "metric",
};

const imperial = {
  weight: "pounds",
  height: "inches",
};

const metric = {
  weight: "kilograms",
  height: "centimeters",
};
export const BmiCalculator = () => {
  const [measurements, setMeasurements] = useState({
    weight: 0,
    height: 0,
  });
  const [uom, setUom] = useState(UOM.imperial);
  const [units, setUnits] = useState({
    height: imperial.weight,
    weight: imperial.height,
  });

  // update the units of measure
  useEffect(() => {
    if (uom === UOM.metric) {
      setUnits({
        weight: metric.weight,
        height: metric.height,
      });
    } else {
      setUnits({
        weight: imperial.weight,
        height: imperial.height,
      });
    }
  }, [uom]);

  const handleUomChange = (event) => {
    setUom(event.target.value);
  };

  const handleMeasurementChange = (event) => {
    const { name, value } = event.target;
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
                value={metric.weight}
                className={units.weight === metric.weight ? "selected" : ""}
              >
                {metric.weight}
              </option>
              <option
                value={imperial.weight}
                className={units.weight === imperial.weight ? "selected" : ""}
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
                  value={metric.height}
                  className={units.height === metric.height ? "selected" : ""}
                >
                  {metric.height}
                </option>
                <option
                  value={imperial.height}
                  className={units.height === imperial.height ? "selected" : ""}
                >
                  {imperial.height}
                </option>
              </select>
            </span>
          </div>
        </div>
      </div>
      {measurements.cm && measurements.kg && (
        <BmiChart height={measurements.cm} weight={measurements.kg} />
      )}
    </form>
  );
};
