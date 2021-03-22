import { BmiUtils, categories } from "../util/BmiUtils";

/**
 *
 * @param {Number} height in centimeters
 * @param {Number} weight in kilograms
 */
export const BmiChart = ({ height, weight }) => {
  const meters = height / 100; // convert from centimeters
  const bmi = BmiUtils.calculateBmi(weight, meters);
  const category = BmiUtils.bmiCategory(bmi);
  const underweightRange = BmiUtils.underweightThresholdKg(meters);
  const normalWeightRange = BmiUtils.normalThresholdKg(meters);
  const overweightRange = BmiUtils.overweightThresholdKg(meters);
  const obeseRange = BmiUtils.obeseThresholdKg(meters);

  const round = (number) => {
    return Intl.NumberFormat("en-us", {
      maximumFractionDigits: 2,
    }).format(number);
  };
  return (
    <>
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
                  "progress-bar  " + category.name ===
                  categories.underweight.name
                    ? "bg-warning"
                    : category.name === categories.normal.name
                    ? "bg-success"
                    : category.name === categories.overweight.name
                    ? "bg-warning"
                    : category.name === categories.obese.name
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
      <div className="row">
        <div className="col">
          <div className="p-3">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">BMI</th>
                  <th scope="col">Kilograms</th>
                  <th scope="col">Pounds</th>
                  <th scope="col">Category</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{"< " + categories.underweight.upperThreshold}</td>
                  <td>{`0 - ${round(underweightRange.max)}`}</td>
                  <td></td>
                  <td>{categories.underweight.name}</td>
                </tr>
                <tr>
                  <td>
                    {categories.normal.lowerThreshold +
                      " - " +
                      categories.normal.upperThreshold}
                  </td>
                  <td>{`${round(normalWeightRange.min)} - ${round(
                    normalWeightRange.max
                  )}`}</td>
                  <td></td>
                  <td>{categories.normal.name}</td>
                </tr>
                <tr>
                  <td>
                    {categories.overweight.lowerThreshold +
                      " - " +
                      categories.overweight.upperThreshold}
                  </td>
                  <td>{`${round(overweightRange.min)} - ${round(
                    overweightRange.max
                  )}`}</td>
                  <td></td>
                  <td>{categories.overweight.name}</td>
                </tr>
                <tr>
                  <td>{"> " + categories.obese.lowerThreshold}</td>
                  <td>{`${round(obeseRange.min)} +`}</td>
                  <td></td>
                  <td>{categories.obese.name}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};
