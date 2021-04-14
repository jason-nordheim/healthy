import { round } from "../../util/UnitUtilities";

const NUTRIENTS = {
  CA: {
    name: "Calcium",
    unit: "mg",
  },
  CHOCDF: {
    name: "Carbs",
    unit: "mg",
  },
  CHOLE: {
    name: "Cholesterol",
    unit: "mg",
  },
  FAMS: {
    name: "Monounsaturated",
    unit: "g",
  },
  FAPU: {
    name: "Polyunsaturated",
    unit: "g",
  },
  FASAT: {
    name: "Saturated",
    unit: "g",
  },
  FAT: {
    name: "Fat",
    unit: "g",
  },
  FATRN: {
    name: "Trans",
    unit: "g",
  },
  FE: {
    name: "Iron",
    unit: "mg",
  },
  FIBTG: {
    name: "Fiber",
    unit: "g",
  },
  FOLDFE: {
    name: "Folate",
    unit: "æg",
  },
  K: {
    name: "Potassium",
    unit: "mg",
  },
  MG: {
    name: "Magnesium",
    unit: "mg",
  },
  NA: {
    name: "Sodium",
    unit: "mg",
  },
  ENERC_KCAL: {
    name: "Energy",
    unit: "kcal",
  },
  NIA: {
    name: "Niacin (B3)",
    unit: "mg",
  },
  P: {
    name: "Phosphorus",
    unit: "mg",
  },
  PROCNT: {
    name: "Protein",
    unit: "g",
  },
  RIBF: {
    name: "Riboflavin (B2)",
    unit: "mg",
  },
  SUGAR: {
    name: "Sugars",
    unit: "g",
  },
  THIA: {
    name: "Thiamin (B1)",
    unit: "mg",
  },
  TOCPHA: {
    name: "Vitamin E",
    unit: "mg",
  },
  VITA_RAE: {
    name: "Vitamin A",
    unit: "æg",
  },
  VITB12: {
    name: "Vitamin B12",
    unit: "æg",
  },
  VITB6A: {
    name: "Vitamin B6",
    unit: "mg",
  },
  VITC: {
    name: "Vitamin C",
    unit: "mg",
  },
  VITD: {
    name: "Vitamin D",
    unit: "æg",
  },
  VITK1: {
    name: "Vitamin K",
    unit: "æg",
  },
};

export const Food = ({ food }) => {
  const {
    category,
    categoryLabel,
    foodId,
    image,
    label,
    nutrients,
    servingsPerContainer,
  } = food;

  const nutrientLabels = Object.keys(nutrients);
  const nutrientValues = Object.values(nutrients);

  return (
    <div className="container">
      <div className="row rounded card shadow mb-3">
        <span className="col-sm-auto mt-3 text-center">
          <h4 className="">{label}</h4>
        </span>
        <span className="col-sm-auto mt-2">
          <small>
            <table className="table table-sm ">
              <tbody className="table-striped">
                <tr>
                  <td scope="row">Category</td>
                  <td className="fw-light">{category}</td>
                </tr>
                <tr>
                  <td>Servings</td>
                  <td className="fw-light">{round(servingsPerContainer, 0)}</td>
                </tr>
                {nutrientLabels.map((label, index) => {
                  return (
                    <tr
                      key={`${foodId}${label}${nutrientValues[index]}${NUTRIENTS[label].name}`}
                    >
                      <td>{NUTRIENTS[label].name}</td>
                      <td className="fw-light">
                        {`${round(nutrientValues[index], 1)} ${
                          NUTRIENTS[label].unit
                        }`}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </small>
        </span>
        <span className="col mb-2 text-center">
          <button className="btn btn-secondary">{`Log ${label}`}</button>
        </span>
      </div>
    </div>
  );
};
