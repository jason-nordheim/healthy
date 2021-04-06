import { useState } from "react";
import { PageTitle } from "../layout/PageTitle";

const LOGS = {
  FOOD: "Food",
  ACTIVITY: "Actviity",
  WEIGHT: "Weight",
};

export const LogsPage = () => {
  const [selected, setSelected] = useState(null);

  const handleLogTypeSelect = (e) => {
    // inner text will match the type
    const { innerText } = e.target;
    if (innerText === selected) {
      setSelected(null);
    } else {
      setSelected(innerText);
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-auto">
          <PageTitle text="Logs" />
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-sm-auto">
            <div
              className="btn-group d-flex"
              role="group"
              aria-label="select logs"
            >
              <button
                type="button"
                onClick={handleLogTypeSelect}
                className={
                  selected === LOGS.ACTIVITY
                    ? "btn btn-primary"
                    : "btn btn-secondary"
                }
              >
                {LOGS.ACTIVITY}
              </button>
              <button
                type="button"
                onClick={() => setSelected(LOGS.FOOD)}
                className={
                  selected === LOGS.FOOD
                    ? "btn btn-primary"
                    : "btn btn-secondary"
                }
              >
                {LOGS.FOOD}
              </button>
              <button
                type="button"
                onClick={() => setSelected(LOGS.WEIGHT)}
                className={
                  selected === LOGS.WEIGHT
                    ? "btn btn-primary"
                    : "btn btn-secondary"
                }
              >
                {LOGS.WEIGHT}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
