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
export const BmiChart = ({ meters, uom }) => {
  const kgRanges = kgRange(meters);
  const lbRanges = lbRange(meters);

  return uom === UOM.IMPERIAL ? (
    <>
      <div className="row">
        <div className="col-sm-auto">
          <table
            className="table table-responsive"
            style={{ fontSize: "0.9rem" }}
          >
            <thead>
              <tr>
                <th scope="col">Category</th>
                <th scope="col">Weight Range</th>
              </tr>
            </thead>
            <tbody className="fw-light">
              <tr>
                <td className="text-capitalize">
                  {categories.underweight.name}
                </td>
                <td>{formatRangeToString(lbRanges.underweight)}</td>
              </tr>
              <tr>
                <td className="text-capitalize">{categories.normal.name}</td>
                <td>{formatRangeToString(lbRanges.normal)}</td>
              </tr>
              <tr>
                <td className="text-capitalize">
                  {categories.overweight.name}
                </td>
                <td>{formatRangeToString(lbRanges.overweight)}</td>
              </tr>
              <tr>
                <td className="text-capitalize">{categories.obese.name}</td>
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
          <table
            className="table table-responsive"
            style={{ fontSize: "0.9rem" }}
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
