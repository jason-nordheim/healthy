import { useState } from "react";
import { useWindowSize } from "../../hooks/useWindowSize";
import { PageTitle } from "../layout/PageTitle";

const LOGS = {
  FOOD: "Food",
  ACTIVITY: "Actviity",
  WEIGHT: "Weight",
};

export const LogsPage = () => {
  const [selected, setSelected] = useState(null);
  const windowSize = useWindowSize();
  console.log(windowSize);

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
                    ? "btn btn-primary border"
                    : "btn btn-secondary border"
                }
              >
                {LOGS.ACTIVITY}
              </button>
              <button
                type="button"
                onClick={handleLogTypeSelect}
                className={
                  selected === LOGS.FOOD
                    ? "btn btn-primary border"
                    : "btn btn-secondary border"
                }
              >
                {LOGS.FOOD}
              </button>
              <button
                type="button"
                onClick={handleLogTypeSelect}
                className={
                  selected === LOGS.WEIGHT
                    ? "btn btn-primary border"
                    : "btn btn-secondary border"
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
