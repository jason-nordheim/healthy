import { useState, useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import { FormTitle } from "./FormTitle";
import { TextInput } from "./input/TextInput";
import { SubmitButton } from "./input/SubmitButton";

import { Label } from "./Label";
import { PasswordInput } from "./input/PasswordInput";
import { SelectBirthday } from "./select/SelectBirthday";
import { FormErrorMessage } from "./FormErrorMessage";
import { AuthActions } from "../../context/auth.actions";

export const RegisterForm = () => {
  const [state, dispatch] = useContext(AuthContext);

  // component state
  const [fields, setFields] = useState({
    first: "",
    last: "",
    email: "",
    password: "",
  });
  const [birthday, setBirthday] = useState({ day: 1, month: 1, year: 2020 });

  // de-structure for readability
  const { first, last, email, password } = fields;

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
  // handle fieldValue change
  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    setFields({
      ...fields,
      [name]: value,
    });
  };
  return (
    <form
      className="d-flex flex-column justify-content-center"
      onSubmit={handleSubmit}
    >
      <FormTitle title="Register" />

      <div className="container mb-3 ">
        <div className="row">
          <div className="col-sm-auto">
            <Label label="Name" />
          </div>
          <div className="row">
            <div className="col-sm-auto mb-2">
              <span className="input-group">
                <Label label="First" name="first" inputText={true} />
                <TextInput
                  for="first"
                  name="first"
                  id="first"
                  value={first}
                  onChange={handleFieldChange}
                />
              </span>
            </div>
            <div className="col-sm-auto mb-2">
              <span className="input-group">
                <Label label="Last" name="last" inputText={true} />
                <TextInput
                  for="last"
                  name="last"
                  id="last"
                  value={last}
                  onChange={handleFieldChange}
                />
              </span>
            </div>
          </div>
        </div>
      </div>

      <SelectBirthday birthday={birthday} setBirthday={setBirthday} />

      <div className="container">
        <div className="row">
          <div className="col-sm-auto">
            <Label label="Credentials" />
          </div>
        </div>
        <div className="row">
          <div className="col-sm-auto">
            <span className="input-group mb-2">
              <Label label="Email" name="fist" inputText={true} />
              <TextInput
                for="email"
                id="email"
                label="Email Address"
                name="email"
                value={email}
                required={true}
                onChange={handleFieldChange}
              />
            </span>
            <div className="col-sm-auto">
              <span className="input-group">
                <Label label="Password" name="password" inputText={true} />
                <PasswordInput
                  password={password}
                  onChange={handleFieldChange}
                />
              </span>
            </div>
          </div>
        </div>

        <div className="row mb-3"></div>
      </div>

      <div className="container">
        <div className="row">
          <div className="col-sm-auto d-flex justify-content-center">
            <SubmitButton
              onSubmit={handleSubmit}
              label="Create Account"
              className=""
            />
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
