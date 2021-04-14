import { useContext, useState } from "react";
import { AuthContext } from "../../context/auth.context";
import { FormErrorMessage } from "./FormErrorMessage";
import { FormTitle } from "./FormTitle";
import { Label } from "./Label";
import { TextInput } from "./input/TextInput";
import { PasswordInput } from "./input/PasswordInput";
import { SubmitButton } from "./input/SubmitButton";
import { AuthActions } from "../../context/auth.actions";

export const LoginForm = () => {
  const [state, dispatch] = useContext(AuthContext);
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formValues;

  // submit handler
  const handleSubmit = (event) => {
    event.preventDefault();
    const user = { email, password };
    AuthActions.Login(user, dispatch);
  };

  const handleFormValueChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };
  return (
    <form onSubmit={handleSubmit}>
      <FormTitle title="Login" />

      <div className="container">
        <div className="row">
          <div className="col mb-3">
            <Label label="Email Address" name="email" />
            <TextInput
              for="email"
              id="email"
              label="Email Address"
              name="email"
              value={email}
              required={true}
              onChange={handleFormValueChange}
            />
          </div>
        </div>
        <div className="row">
          <div className="mb-3">
            <Label label="Password" name="password" />
            <PasswordInput
              password={password}
              onChange={handleFormValueChange}
            />
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-sm-auto d-flex justify-content-center">
            <SubmitButton onSubmit={handleSubmit} label="Login" />
          </div>
        </div>
      </div>
      {state?.error && (
        <div className="container">
          <div className="row">
            <div className="col mt-3">
              <FormErrorMessage message={state.error} />
            </div>
          </div>
        </div>
      )}
    </form>
  );
};
