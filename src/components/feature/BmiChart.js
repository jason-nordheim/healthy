import { UOM } from "../../config";
import { BmiUtils, categories } from "../../util/BmiUtils";
import { round } from "../../util/UnitUtilities";
import { Label } from "../forms/Label";

// const convertKgRangeToLb = (kgRange) => {
//   return {
//     min: convert.kilogramsToPounds(kgRange.min),
//     max: convert.kilogramsToPounds(kgRange.max),
//   };
// };

const formatRangeToString = (range) => {
  if (range.min && range.max)
    return `${round(range.min)} - ${round(range.max)}`;
  else if (range.min && !range.max) return `over ${round(range.min)}`;
  else if (!range.min && range.max) return `under ${round(range.max)}`;
  else
    throw new Error("invalid range object: must have a `min` or `max` value");
};

/**
 *
 * @param {Number} height in centimeters
 * @param {Number} weight in kilograms
 */
export const BmiChart = ({ meters, bmi, uom }) => {
  const category = BmiUtils.bmiCategory(bmi);

  const kgRanges = BmiUtils.kgRange(meters);
  const lbRanges = BmiUtils.lbRange(meters);

  return uom === UOM.IMPERIAL ? (
    <>
      <div className="row">
        <Label Label="BMI" />
      </div>
      <div className="row mt-3 mb-3">
        <div className="col-sm-auto">
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
                "progress-bar  " + category.name === categories.underweight.name
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
      <div className="row">
        <div className="col-sm-auto">
          <table
            className="table table-responsive"
            style={{ fontSize: "0.75rem" }}
          >
            <thead>
              <tr>
                <th scope="col">Category</th>
                <th scope="col">Weight Range</th>
              </tr>
            </thead>
            <tbody className="fw-light">
              <tr>
                <td>{categories.underweight.name}</td>
                <td>{formatRangeToString(lbRanges.underweight)}</td>
              </tr>
              <tr>
                <td>{categories.normal.name}</td>
                <td>{formatRangeToString(lbRanges.normal)}</td>
              </tr>
              <tr>
                <td>{categories.overweight.name}</td>
                <td>{formatRangeToString(lbRanges.overweight)}</td>
              </tr>
              <tr>
                <td>{categories.obese.name}</td>
                <td>{formatRangeToString(lbRanges.obese)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  ) : (
    <>
      <div className="row">
        <Label Label="BMI" />
      </div>
      <div className="row mt-3 mb-3">
        <div className="col-sm-auto">
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
                "progress-bar  " + category.name === categories.underweight.name
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
      <div className="row">
        <div className="col-sm-auto">
          <table
            className="table table-responsive"
            style={{ fontSize: "0.75rem" }}
          >
            <thead>
              <tr>
                <th scope="col">Category</th>
                <th scope="col">Weight Range</th>
              </tr>
            </thead>
            <tbody className="fw-light">
              <tr>
                <td>{categories.underweight.name}</td>
                <td>{formatRangeToString(kgRanges.underweight)}</td>
              </tr>
              <tr>
                <td>{categories.normal.name}</td>
                <td>{formatRangeToString(kgRanges.normal)}</td>
              </tr>
              <tr>
                <td>{categories.overweight.name}</td>
                <td>{formatRangeToString(kgRanges.overweight)}</td>
              </tr>
              <tr>
                <td>{categories.obese.name}</td>
                <td>{formatRangeToString(kgRanges.obese)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};
