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
    <>
      <div className="row rounded">
        <div className="col-sm-auto border my-2 ">
          <span className="w-100">
            <p className="pt-3 mx-auto">{label}</p>
          </span>
          <table className="table table-responsive table-bordered table-sm ">
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
        </div>
      </div>
    </>
  );
};
