import { useContext, useState } from "react";
import { RegisterForm } from "../forms/RegisterForm";
import { LoginForm } from "../forms/LoginForm";
import { AuthActions, AuthContext } from "../../context/auth.context";

export const AccountPage = () => {
  const [state, dispatch] = useContext(AuthContext);
  const [showRegistration, setShowRegistration] = useState(false);
  const toggleForms = (e) => setShowRegistration(!showRegistration);

  const logout = (e) => {
    AuthActions.Logout(dispatch);
  };
  return state?.token ? (
    <div className="container">
      <div className="row">
        <div className="jumbotron mb-3 mt-3">
          <h1>Welcome</h1>
        </div>
      </div>
      <hr class="my-4" />
      <div className="row">
        <div className="col">
          <p className="lead">
            <span>{state.token}</span>
          </p>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <button className="btn btn-primary" onClick={logout}>
            Logout
          </button>
        </div>
      </div>
    </div>
  ) : (
    <div className="container">
      {showRegistration ? (
        <>
          <div className="row">
            <div className="col mt-3">
              <RegisterForm />
            </div>
          </div>
          <div className="row">
            <span className="col mb-3 mt-3">
              <h6 className="text-center">
                Don't have an account? Register{" "}
                <u style={{ cursor: "pointer" }} onClick={toggleForms}>
                  here
                </u>
              </h6>
            </span>
          </div>
        </>
      ) : (
        <>
          <div className="row">
            <div className="col mt-3">
              <LoginForm />
            </div>
          </div>
          <div className="row">
            <span className="col mb-3 mt-3">
              <h6 className="text-center">
                Already have an account? Login{" "}
                <u style={{ cursor: "pointer" }} onClick={toggleForms}>
                  here
                </u>
              </h6>
            </span>
          </div>
        </>
      )}
    </div>
  );
};
