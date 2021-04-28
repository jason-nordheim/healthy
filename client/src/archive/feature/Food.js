import { round } from "../../util/UnitUtilities";
import { NUTRIENTS } from "../../config/config.edamin";

export const Food = ({ food, foodActionLabel, foodActionHandler }) => {
  const { category, foodId, label, nutrients, servingsPerContainer } = food;

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
                  <td>Category</td>
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
          <button
            className="btn btn-secondary"
            onClick={() => foodActionHandler(food)}
          >{`${foodActionLabel} ${label}`}</button>
        </span>
      </div>
    </div>
  );
};
