import { PageTitle } from "../layout/PageTitle";
import { BmiCalculator } from "../feature/BmiCalculator";
import { useContext, useEffect, useReducer } from "react";
import { UserActions } from "../../context/user.actions";
import { UserReducer } from "../../context/user.reducer";
import { AuthContext } from "../../context/auth.context";
import { UserState } from "../../context/user.state";

export const ToolsPage = () => {
  const [authState, authDispatch] = useContext(AuthContext);
  const [userState, userDispatch] = useReducer(UserReducer, UserState.initial);

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
        <div className="col">
          <BmiCalculator profile={userState.profile} />
        </div>
      </div>
    </div>
  );
};
