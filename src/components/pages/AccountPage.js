import { useContext, useState } from "react";
import { RegisterForm } from "../forms/RegisterForm";
import { LoginForm } from "../forms/LoginForm";
import { AuthContext } from "../../context/auth.context";
import { EditProfile } from "../forms/EditProfile";
import { PageTitle } from "../layout/PageTitle";
import { useProfile } from "../../hooks/useProfile";

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
      <p className="text-center fw-light">
        Don't have an account? Register{" "}
        <u style={{ cursor: "pointer" }} onClick={toggleForms}>
          here
        </u>
      </p>
    ) : (
      <p className="text-center fw-light">
        Already have an account? Login{" "}
        <u style={{ cursor: "pointer" }} onClick={toggleForms}>
          here
        </u>
      </p>
    );

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <PageTitle text={`My Account`} />
        </div>
      </div>
      <div className="container shadow">
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
    </div>
  );
};

/**
 * Account Page For Authenticated Users
 */
const Authenticated = ({ state, dispatch }) => {
  const [userData, update] = useProfile(state?.token, dispatch);
  // retrieve user profile when the component mounts

  return (
    <div className="container">
      <div className="row">
        <PageTitle text="My Account" />
      </div>
      <div className="container">
        {userData?.first && (
          <EditProfile
            userData={userData}
            token={state.token}
            updateUser={update}
          />
        )}
      </div>
    </div>
  );
};

export const AccountPage = () => {
  const [state, dispatch] = useContext(AuthContext);
  return state?.token?.length > 10 ? (
    <Authenticated state={state} dispatch={dispatch} />
  ) : (
    <UnAuthenticated />
  );
};
