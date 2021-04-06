import { categories, BmiUtils } from "../../util/BmiUtils";
import { round } from "../../util/UnitUtilities";
import { Label } from "../forms/Label";

const { bmiCategory } = BmiUtils;
export const Bmi = ({ bmi }) => {
  const category = bmiCategory(bmi);
  return (
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
    </>
  );
};
