import { useState } from "react";
import { ManualFoodForm } from "../forms/ManualFoodForm";
import { FoodSearch } from "./FoodSearch";

const ADD_OPTIONS = {
  SEARCH: "Search",
  MANUAL: "Manual Entry",
};
export const AddFood = () => {
  const { SEARCH, MANUAL } = ADD_OPTIONS;
  const [addBy, setAddBy] = useState(SEARCH);
  const handleAddSelect = (e) => {
    e.preventDefault();
    setAddBy(e.target.innerText);
  };
  return (
    <div>
      <div className="row">
        <div className="col-sm-auto">
          <div
            className="btn-group d-flex"
            role="group"
            aria-label="Select add method"
          >
            <button
              type="button"
              data-toggle={addBy === SEARCH ? "collapse show" : "collapse"}
              onClick={handleAddSelect}
              className={
                addBy === SEARCH
                  ? "btn btn-primary border"
                  : "btn btn-secondary border"
              }
            >
              {SEARCH}
            </button>
            <button
              type="button"
              data-toggle={addBy === MANUAL ? "collapse show" : "collapse"}
              onClick={handleAddSelect}
              className={
                addBy === MANUAL
                  ? "btn btn-primary border"
                  : "btn btn-secondary border"
              }
            >
              {MANUAL}
            </button>
          </div>
        </div>
      </div>
      <div className="row mt-2">
        <div className="col-sm-auto">
          <span className={addBy === SEARCH ? "collapse show" : "collapse"}>
            <FoodSearch />
          </span>

          <span className={addBy === MANUAL ? "collapse show" : "collapse"}>
            <ManualFoodForm />
          </span>
        </div>
      </div>
    </div>
  );
};
