import { useState } from "react";
import { RegisterForm } from "../forms/RegisterForm";
import { LoginForm } from "../forms/LoginForm";

export const AccountPage = () => {
  const [showRegistration, setShowRegistration] = useState(false);
  const toggleForms = (e) => {
    setShowRegistration(!showRegistration);
  };
  return (
    <div className="container">
      {showRegistration ? (
        <>
          <div className="row">
            <div className="col mt-3">
              <RegisterForm />
            </div>
          </div>
          <div className="row">
            <span>
              <h6>
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
            <span className="col mb-3 mt-3    ">
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
