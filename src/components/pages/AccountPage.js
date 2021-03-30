import { useContext, useState } from "react";
import { RegisterForm } from "../forms/RegisterForm";
import { LoginForm } from "../forms/LoginForm";
import { AuthActions, AuthContext } from "../../context/auth.context";
import { EditProfile } from "../forms/EditProfile";
import { PageTitle } from "../layout/PageTitle";

/**
 * Account Page for Unauthenticated users
 */
const UnAuthenticated = () => {
  const [showRegistration, setShowRegistration] = useState(false);
  const toggleForms = (e) => setShowRegistration(!showRegistration);

  const DisplayedForm = () =>
    showRegistration ? <RegisterForm /> : <LoginForm />;

  const SwitchForms = () =>
    showRegistration ? (
      <h6 className="text-center">
        Don't have an account? Register{" "}
        <u style={{ cursor: "pointer" }} onClick={toggleForms}>
          here
        </u>
      </h6>
    ) : (
      <h6 className="text-center">
        Already have an account? Login{" "}
        <u style={{ cursor: "pointer" }} onClick={toggleForms}>
          here
        </u>
      </h6>
    );

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <PageTitle text={`My Account`} />
        </div>
      </div>
      <div className="row">
        <div className="col mt-3">
          <DisplayedForm />
        </div>
      </div>
      <div className="row">
        <span className="col mb-3 mt-3">
          <SwitchForms />
        </span>
      </div>
    </div>
  );
};

/**
 * Account Page For Authenticated Users
 */
const Authenticated = ({ state, dispatch }) => {
  const logout = (e) => {
    e.preventDefault();
    AuthActions.Logout(dispatch);
  };
  return (
    <div className="container">
      <div className="row">
        <PageTitle text="Welcome" />
      </div>
      <div className="row">
        <div className="col">
          <p className="lead">
            <span>{state.token}</span>
          </p>
        </div>
      </div>
      <div className="container">
        <EditProfile />
      </div>
      <div className="row">
        <div className="col">
          <button className="btn btn-primary" onClick={logout}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export const AccountPage = () => {
  const [state, dispatch] = useContext(AuthContext);
  if (state?.token) return <Authenticated state={state} dispatch={dispatch} />;
  else return <UnAuthenticated />;
};
