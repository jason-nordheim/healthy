import { BmiUtils, categories } from "../../util/BmiUtils";
import { round } from "../../util/UnitUtilities";

// const convertKgRangeToLb = (kgRange) => {
//   return {
//     min: convert.kilogramsToPounds(kgRange.min),
//     max: convert.kilogramsToPounds(kgRange.max),
//   };
// };

const formatRangeToString = (range) => {
  if (range.min && range.max)
    return `${round(range.min)} - ${round(range.max)}`;
  else if (range.min && !range.max) return `> ${round(range.min)}`;
  else if (!range.min && range.max) return `< ${round(range.max)}`;
  else
    throw new Error("invalid range object: must have a `min` or `max` value");
};

/**
 *
 * @param {Number} height in centimeters
 * @param {Number} weight in kilograms
 */
export const BmiChart = ({ meters, bmi }) => {
  const category = BmiUtils.bmiCategory(bmi);

  const kgRanges = BmiUtils.kgRange(meters);
  const lbRanges = BmiUtils.lbRange(meters);

  return (
    <div className="container">
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
                {round(bmi)}
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
                  <td>{formatRangeToString(kgRanges.underweight)}</td>
                  <td>{formatRangeToString(lbRanges.underweight)}</td>
                  <td>{categories.underweight.name}</td>
                </tr>
                <tr>
                  <td>
                    {`${round(categories.normal.minBmi)} - ${round(
                      categories.normal.maxBmi
                    )}`}
                  </td>
                  <td>{formatRangeToString(kgRanges.normal)}</td>
                  <td>{formatRangeToString(lbRanges.normal)}</td>
                  <td>{categories.normal.name}</td>
                </tr>
                <tr>
                  <td>
                    {`${round(categories.overweight.minBmi)} - ${round(
                      categories.overweight.maxBmi
                    )}`}
                  </td>
                  <td>{formatRangeToString(kgRanges.overweight)}</td>
                  <td>{formatRangeToString(lbRanges.overweight)}</td>
                  <td>{categories.overweight.name}</td>
                </tr>
                <tr>
                  <td>{` > ${round(categories.obese.minBmi)}`}</td>
                  <td>{formatRangeToString(kgRanges.obese)}</td>
                  <td>{formatRangeToString(lbRanges.obese)}</td>
                  <td>{categories.obese.name}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
