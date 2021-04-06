import { categories } from "../../util/BmiUtils";
import { round } from "../../util/UnitUtilities";
import { Label } from "../forms/Label";

export const Bmi = ({ category, bmi }) => {
  return (
    <>
      <div className="row">
        <Label Label="BMI" />
      </div>
      <div className="row mt-3 mb-3">
        <div className="col-sm-auto">
          <span
            className={
              category?.name === categories.underweight.name
                ? "text-warning"
                : category?.name === categories.normal.name
                ? "text-success"
                : category?.name === categories.overweight.name
                ? "text-warning"
                : category?.name === categories.obese.name
                ? "text-danger"
                : ""
            }
          >
            {round(bmi)}
          </span>
        </div>
      </div>
    </>
  );
};
