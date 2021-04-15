import { useContext, useState } from "react";
import { logFood } from "../../util/ApiUtils";
import { ManualFoodForm } from "../forms/ManualFoodForm";
import { FoodSearch } from "./FoodSearch";
import { AuthContext } from "../../context/auth.context";
import { Redirect } from "react-router-dom";

const ADD_OPTIONS = {
  SEARCH: "Search",
  MANUAL: "Manual Entry",
};
export const AddFood = ({ addFood }) => {
  const { SEARCH, MANUAL } = ADD_OPTIONS;
  const [addBy, setAddBy] = useState(SEARCH);
  const toggleAddBy = (e) => {
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
              onClick={toggleAddBy}
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
              onClick={toggleAddBy}
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
          {addBy === SEARCH ? (
            <span className="collapse show">
              <FoodSearch logFood={addFood} />
            </span>
          ) : (
            <span className="collapse show">
              <ManualFoodForm logFood={addFood} />
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
