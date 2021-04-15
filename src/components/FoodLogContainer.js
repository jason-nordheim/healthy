import { useCallback, useContext, useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import { getFoods, logFood } from "../util/ApiUtils";
import { AddFood } from "./feature/AddFood";
import { FoodLog } from "./feature/FoodLog";
import { FoodSearch } from "./feature/FoodSearch";

const BUTTONS = {
  MY_LOG: "My Log",
  ADD_FOOD: "Add Food",
};

export const FoodLogContainer = () => {
  const [state, dispatch] = useContext(AuthContext);
  const { MY_LOG, ADD_FOOD } = BUTTONS;
  const [selected, setSelected] = useState(MY_LOG);
  const [loggedFoods, setLoggedFoods] = useState([]);

  const getLoggedFoods = useCallback((token) => {
    getFoods(token).then((foods) => setLoggedFoods(foods.foods));
  }, []);

  useEffect(() => {
    getLoggedFoods(state.token);
  }, [getLoggedFoods, state]);

  const handleButtonClick = (e) => {
    e.preventDefault();
    if (e.target.innerText === MY_LOG) {
      setSelected(MY_LOG);
    } else {
      setSelected(ADD_FOOD);
    }
  };

  const addFood = (food) => {
    //console.log(food);
    logFood(state.token, food).then((data) => {
      console.log(data);
      getLoggedFoods(state.token);
    });
  };
  const deleteFood = (food) => {
    console.log(food);
  };

  return state?.token ? (
    <div>
      <div className="row">
        <div className="col-sm-auto">
          <div
            className="btn-group d-flex"
            role="group"
            aria-label="select logs"
          >
            <button
              type="button"
              data-toggle={selected === MY_LOG ? "collapse show" : "collapse"}
              onClick={handleButtonClick}
              className={
                selected === MY_LOG
                  ? "btn btn-primary border"
                  : "btn btn-secondary border"
              }
            >
              {MY_LOG}
            </button>
            <button
              type="button"
              data-toggle={selected === ADD_FOOD ? "collapse show" : "collapse"}
              onClick={handleButtonClick}
              className={
                selected === ADD_FOOD
                  ? "btn btn-primary border"
                  : "btn btn-secondary border"
              }
            >
              {BUTTONS.ADD_FOOD}
            </button>
          </div>
        </div>
      </div>
      <div className="row mt-2">
        <div className="col-sm-auto">
          {/* <div className={selected === null ? "collapse show" : "collapse"}>
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
            </div> */}
          <div className={selected === MY_LOG ? "collapse show" : "collapse"}>
            <FoodLog loggedFoods={loggedFoods} deleteFood={deleteFood} />
          </div>
          <div className={selected === ADD_FOOD ? "collapse show" : "collapse"}>
            <AddFood addFood={addFood} />
          </div>
        </div>
      </div>
    </div>
  ) : (
    <Redirect to="/" />
  );
};
