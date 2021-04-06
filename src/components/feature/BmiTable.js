import { UOM } from "../../config";
import { BmiUtils, categories } from "../../util/BmiUtils";

// const convertKgRangeToLb = (kgRange) => {
//   return {
//     min: convert.kilogramsToPounds(kgRange.min),
//     max: convert.kilogramsToPounds(kgRange.max),
//   };
// };

const { formatRangeToString, kgRange, lbRange } = BmiUtils;

/**
 *
 * @param {Number} height in centimeters
 * @param {Number} weight in kilograms
 */
export const BmiTable = ({ bmi, category, meters, uom }) => {
  const fontSize = "0.9rem";
  const kgRanges = kgRange(meters);
  const lbRanges = lbRange(meters);
  const colorize = bmi > 10 && bmi < 50;

  return uom === UOM.IMPERIAL ? (
    <>
      <div className="row mt-2 mb-2">
        <div className="col-sm-auto">
          <table className="table table-responsive" style={{ fontSize }}>
            <thead>
              <tr>
                <th scope="col">Category</th>
                <th scope="col">Weight Range</th>
              </tr>
            </thead>
            <tbody className="fw-light text-capitalize table-hover  ">
              <tr
                className={
                  colorize && category === categories.underweight ? "table" : ""
                }
              >
                <td>{categories.underweight.name}</td>
                <td>{formatRangeToString(lbRanges.underweight)}</td>
              </tr>
              <tr
                className={
                  colorize && category === categories.normal
                    ? "table-success"
                    : ""
                }
              >
                <td>{categories.normal.name}</td>
                <td>{formatRangeToString(lbRanges.normal)}</td>
              </tr>
              <tr
                className={
                  colorize && category === categories.overweight
                    ? "table-warning"
                    : ""
                }
              >
                <td>{categories.overweight.name}</td>
                <td>{formatRangeToString(lbRanges.overweight)}</td>
              </tr>
              <tr
                className={
                  colorize && category === categories.obese
                    ? "table-danger"
                    : ""
                }
              >
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
        <div className="col-sm-auto">
          <table className="table table-responsive" style={{ fontSize }}>
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
