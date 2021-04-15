import { useState } from "react";
import { ActivityLogContainer } from "../AcitivityLogContainer";
import { FoodLogContainer } from "../FoodLogContainer";
import { PageTitle } from "../layout/PageTitle";
import { WeightLogContainer } from "../WeightLogContainer";

const LOGS = {
  FOOD: "Food",
  ACTIVITY: "Activity",
  WEIGHT: "Weight",
};

const DEFAULT_TITLE = "My Logs";
export const LogsPage = () => {
  const [title, setTitle] = useState(DEFAULT_TITLE);
  const [selected, setSelected] = useState(null);

  const handleLogTypeSelect = (e) => {
    // inner text will match the type
    const { innerText } = e.target;
    if (innerText === selected) {
      setSelected(null);
      setTitle(DEFAULT_TITLE);
    } else {
      setSelected(innerText);
      setTitle(innerText + " log");
    }
  };

  return (
    <div className="container d-flex flex-column align-content-stretch">
      <div className="row">
        <div className="col-sm-auto text-center mb-2">
          <PageTitle text={title} />
        </div>
      </div>
      <div className="container d-flex flex-column align-items-stretch">
        <div className="row">
          <div className="col-sm-auto">
            <div
              className="btn-group d-flex"
              role="group"
              aria-label="select logs"
            >
              <button
                type="button"
                data-toggle={
                  selected === LOGS.ACTIVITY ? "collapse show" : "collapse"
                }
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
                data-toggle={
                  selected === LOGS.FOOD ? "collapse show" : "collapse"
                }
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
                data-toggle={
                  selected === LOGS.WEIGHT ? "collapse show" : "collapse"
                }
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
        <div className="row mt-3">
          <div className="col-sm-auto">
            <div className={selected === null ? "collapse show" : "collapse"}>
              <span
                className="small"
                style={{
                  display: "flex",
                  flex: "1",
                  placeContent: "center",
                }}
              >
                Select a log type to get started ☝
              </span>
            </div>
            <div
              className={
                selected === LOGS.ACTIVITY ? "collapse show" : "collapse"
              }
            >
              <ActivityLogContainer />
            </div>
            <div
              className={selected === LOGS.FOOD ? "collapse show" : "collapse"}
            >
              <FoodLogContainer />
            </div>
            <div
              className={
                selected === LOGS.WEIGHT ? "collapse show" : "collapse"
              }
            >
              <WeightLogContainer />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
