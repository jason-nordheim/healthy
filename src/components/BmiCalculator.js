import { useState } from "react";

const categories = {
  underweight: "underweight",
  normal: "normal",
  overweight: "overweight",
  obese: "obese",
};
const calculateBmi = (kg, meters) => {
  return kg / (meters * meters);
};

const poundsToKilograms = (pounds) => {
  return pounds * 0.453592;
};

const inchesToCentimeters = (inches) => {
  return inches * 2.54;
};
const getBmiCategory = (bmi) => {
  if (bmi <= 18.5) return { name: categories.underweight, percent: 0.25 };
  else if (bmi <= 24.9) return { name: categories.normal, percent: 0.5 };
  else if (bmi <= 29.9) return { name: categories.overweight, percent: 0.75 };
  else return { name: categories.obese, percent: 1 };
};

export const BmiCalculator = () => {
  const [state, setState] = useState({
    weight: 0,
    w_units: "lb",
    height: 0,
    h_units: "in",
    bmi: undefined,
    category: undefined,
  });
  const { bmi, weight, w_units, height, h_units, category } = state;
  const handleSubmit = (event) => {
    event.preventDefault();
    const cm = h_units === "in" ? inchesToCentimeters(height) : height;
    const kg = w_units === "lb" ? poundsToKilograms(weight) : weight;
    const m = cm / 100;
    const bmi = calculateBmi(kg, m);
    const category = getBmiCategory(bmi);
    setState({ ...state, bmi, category });
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
      {bmi && (
        <div className="row">
          <div className="col">
            <div className="p-3">
              <div
                className="progress"
                style={{ height: "1.5rem", textJustify: "center" }}
              >
                <div
                  role="progressbar"
                  style={{
                    width: `${category.percent * 100}%`,
                    height: "100%",
                    fontSize: "1.1rem",
                    textAlign: "center",
                  }}
                  className={
                    "progress-bar  " + category.name === categories.underweight
                      ? "bg-warning"
                      : category.name === categories.normal
                      ? "bg-success"
                      : category.name === categories.overweight
                      ? "bg-warning"
                      : category.name === categories.obese
                      ? "bg-danger"
                      : ""
                  }
                  aria-valuenow={bmi}
                  aria-valuemin="0"
                  aria-valuemax="100"
                >
                  {Intl.NumberFormat("en-us", {
                    maximumFractionDigits: 2,
                  }).format(bmi)}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </form>
  );
};
