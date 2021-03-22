import { useState } from "react";

const calculateBmi = (kg, meters) => {
  return kg / (meters * meters);
};

const poundsToKilograms = (pounds) => {
  return pounds * 0.453592;
};

const inchesToCentimeters = (inches) => {
  return inches * 2.54;
};

export const BmiCalculator = () => {
  const [state, setState] = useState({
    weight: 0,
    w_units: "lb",
    height: 0,
    h_units: "in",
  });
  const { weight, w_units, height, h_units } = state;
  const handleSubmit = (event) => {
    event.preventDefault();
  };
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setState({ ...state, [name]: value });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="row">
        <span>
          <label htmlFor="height">Height</label>
          <input
            type="number"
            name="height"
            id="height"
            value={height}
            onChange={handleInputChange}
          />
        </span>
        <span>
          <select
            name="h_units"
            id="h_units"
            value={h_units}
            onChange={handleInputChange}
          >
            <option value="in">inches</option>
            <option value="cm">centimeters</option>
          </select>
        </span>
      </div>
      <div className="row">
        <span>
          <label htmlFor="weight">Weight</label>
          <input
            type="number"
            name="weight"
            id="weight"
            value={weight}
            onChange={handleInputChange}
          />
        </span>
        <span>
          <select
            name="w_units"
            id="w_units"
            value={w_units}
            onChange={handleInputChange}
          >
            <option value="kg">kilograms</option>
            <option value="lb">pounds</option>
          </select>
        </span>
      </div>
      <div className="row"></div>
      <div className="row">
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </form>
  );
};
