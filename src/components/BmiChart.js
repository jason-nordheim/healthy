import { BmiUtils, categories, convert } from "../util/BmiUtils";

const convertKgRangeToLb = (kgRange) => {
  return {
    min: convert.kilogramsToPounds(kgRange.min),
    max: convert.kilogramsToPounds(kgRange.max),
  };
};

/**
 *
 * @param {Number} height in centimeters
 * @param {Number} weight in kilograms
 */
export const BmiChart = ({ height, weight }) => {
  const meters = height / 100; // convert from centimeters
  const bmi = BmiUtils.calculateBmi(weight, meters);
  const category = BmiUtils.bmiCategory(bmi);

  const kgRanges = {
    underweight: BmiUtils.underweightThresholdKg(meters),
    normal: BmiUtils.normalThresholdKg(meters),
    overweight: BmiUtils.overweightThresholdKg(meters),
    obese: BmiUtils.obeseThresholdKg(meters),
  };

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
                  <td>{`< ${round(categories.underweight.maxBmi)}`}</td>
                  <td>{`< ${round(kgRanges.underweight.max)}`}</td>
                  <td></td>
                  <td>{categories.underweight.name}</td>
                </tr>
                <tr>
                  <td>
                    {`${round(categories.normal.minBmi)} - ${round(
                      categories.normal.maxBmi
                    )}`}
                  </td>
                  <td>{`${round(kgRanges.normal.min)} - ${round(
                    kgRanges.normal.max
                  )}`}</td>
                  <td></td>
                  <td>{categories.normal.name}</td>
                </tr>
                <tr>
                  <td>
                    {`${round(categories.overweight.minBmi)} - ${round(
                      categories.overweight.maxBmi
                    )}`}
                  </td>
                  <td>{`${round(kgRanges.overweight.min)} - ${round(
                    kgRanges.overweight.max
                  )}`}</td>
                  <td></td>
                  <td>{categories.overweight.name}</td>
                </tr>
                <tr>
                  <td>{` > ${round(categories.obese.minBmi)}`}</td>
                  <td>{` > ${round(kgRanges.obese.min)}`}</td>
                  <td>{}</td>
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
