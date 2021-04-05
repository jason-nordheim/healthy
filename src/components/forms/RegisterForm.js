import { useState, useContext } from "react";
import { CLASSES, DEFAULTS } from "../../config";
import { AuthActions, AuthContext } from "../../context/auth.context";
import { FormTitle } from "./FormTitle";
import { TextInput } from "./input/TextInput";
import { SubmitButton } from "./input/SubmitButton";

import { Label } from "./Label";
import { PasswordInput } from "./input/PasswordInput";
import { SelectBirthday } from "./select/SelectBirthday";
import { FormErrorMessage } from "./FormErrorMessage";

export const RegisterForm = () => {
  // context
  const [state, dispatch] = useContext(AuthContext);

  // component state
  const [formValues, setFormValues] = useState(DEFAULTS.USER);
  const [birthday, setBirthday] = useState(DEFAULTS.BIRTHDAY);

  // de-structure for readability
  const { first, last, email, password } = formValues;

  // submit event handler
  const handleSubmit = (event) => {
    event.preventDefault();
    const { day, month, year } = birthday;
    const user = {
      first,
      last,
      email,
      password,
      day,
      month,
      year,
    };
    AuthActions.Register(user, dispatch);
  };

  // form onChange event handler
  const handleFormValueChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };
  return (
    <form onSubmit={handleSubmit}>
      <FormTitle title="Register" />

      <div className="container">
        <div className="row">
          <div className="col mb-3">
            <Label label="First Name" name="fist" />
            <TextInput
              type="text"
              className="form-control"
              id="fist"
              value={first}
              name="first"
              required
              onChange={handleFormValueChange}
            />
          </div>
          <div className="col mb-3">
            <Label label="Last Name" name="fist" />
            <TextInput
              for="last"
              type="text"
              name="last"
              label="Last Name"
              id="last"
              value={last}
              onChange={handleFormValueChange}
            />
          </div>
        </div>
      </div>

      <SelectBirthday birthday={birthday} setBirthday={setBirthday} />

      <div className="container">
        <div className="row">
          <div className="col mb-3">
            <Label label="Email Address" name="fist" />
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
          <div className="col mb-3">
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
          <div className="col position-relative end">
            <SubmitButton onSubmit={handleSubmit} label="Login" />
          </div>
        </div>
      </div>

      {state?.error && (
        <div className="row">
          <div className="col mt-3">
            <FormErrorMessage message={state.error} />
          </div>
        </div>
      )}
    </form>
  );
};
