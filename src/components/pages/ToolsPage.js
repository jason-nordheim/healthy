import { PageTitle } from "../layout/PageTitle";
import { BmiCalculator } from "../feature/BmiCalculator";
import { useContext, useEffect, useReducer, useState } from "react";
import { UserActions } from "../../context/user.actions";
import { UserReducer } from "../../context/user.reducer";
import { AuthContext } from "../../context/auth.context";
import { UserState } from "../../context/user.state";

export const ToolsPage = () => {
  const [authState, authDispatch] = useContext(AuthContext);
  const [userState, userDispatch] = useReducer(UserReducer, UserState.initial);
  const [expandMenu, setExpandMenu] = useState(false);
  const [showCalc, setShowCalc] = useState(false);

  useEffect(() => {
    if (!authState) return;
    else if (!authState.token) return;
    UserActions.GetProfile(authState.token, userDispatch, authDispatch);
  }, [authState, authDispatch]);

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <PageTitle text="Healthy Tools" />
        </div>
      </div>
      <div className="row">
        <div className="col-sm-auto">
          <div className="container">
            <div className="button-group">
              <button
                id="calculatorsDropdown"
                className="btn btn-secondary dropdown-toggle"
                type="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded={expandMenu}
                onClick={(e) => setExpandMenu(!expandMenu)}
              >
                Calculators
              </button>
            </div>
            <div
              className={expandMenu ? "dropdown-menu show" : "dropdown-menu"}
              aria-labelledby="calculatorsDropdown"
              style={{ position: "relative" }}
              onClick={(e) => setExpandMenu(!expandMenu)}
            >
              <button
                className="btn dropdown-item"
                type="button"
                data-toggle={showCalc ? "collapse show" : "collapse"}
                data-target="#bmiCalc"
                aria-expanded={showCalc}
                aria-controls="bmiCalc"
                onClick={(e) => setShowCalc(!showCalc)}
              >
                BMI Calculator
              </button>
            </div>
          </div>
        </div>
        <div id="bmiCalc" className={showCalc ? "collapse show" : "collapse"}>
          <BmiCalculator profile={userState.profile} />
        </div>
      </div>
    </div>
  );
};
