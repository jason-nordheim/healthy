import { useState, useContext } from "react";
import { DEFAULTS, MONTHS } from "../../config";
import { AuthActions, AuthContext } from "../../context/auth.context";
import { LabeledInput } from "../common/LabeledInput";
import { LabeledSelect } from "../common/LabeledSelect";

export const RegisterForm = () => {
  // context
  const [state, dispatch] = useContext(AuthContext);

  // component state
  const [formValues, setFormValues] = useState(DEFAULTS.USER);
  const [birthday, setBirthday] = useState(DEFAULTS.BIRTHDAY);

  // de-structure for readability
  const { first, last, email, password } = formValues;
  const { day, month, year } = birthday;

  // submit event handler
  const handleSubmit = (event) => {
    event.preventDefault();
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

  // birthday onChange event handler
  const handleBirthdayChange = (event) => {
    const { name, value } = event.target;
    setBirthday({ ...birthday, [name]: value });
  };
  // form onChange event handler
  const handleFormValueChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="row">
        <div className="col mt-3 mb-3">
          <h2 className="text-center">Register</h2>
        </div>
      </div>
      <div className="row">
        <div className="col mb-3">
          <label htmlFor="first" className="form-label">
            First Name
          </label>
          <input
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
          <LabeledInput
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
      <div className="row">
        <label htmlFor="birthday" className="form-label">
          Birthday
        </label>
        <div className="col mb-3">
          <LabeledInput
            id="day"
            name="day"
            label="Day"
            value={day}
            onChange={handleBirthdayChange}
            type="number"
            min={1}
            max={31}
          />
        </div>
        <div className="col mb-3">
          <LabeledSelect
            id="month"
            name="month"
            label="Month"
            value={month}
            required={true}
            onChange={handleBirthdayChange}
            selectOptions={MONTHS.map((m) => {
              return {
                key: m.value,
                id: m.id,
                value: m.name,
              };
            })}
          />
        </div>
        <div className="col mb-3">
          <LabeledInput
            for="year"
            id="year"
            label="Year"
            type="number"
            name="year"
            value={year}
            required={true}
            onChange={handleBirthdayChange}
          />
        </div>
      </div>
      <div className="row">
        <div className="col mb-3">
          <LabeledInput
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
          <LabeledInput
            for="password"
            type="password"
            id="password"
            label="Password"
            name="password"
            value={password}
            required={true}
            onChange={handleFormValueChange}
          />
          <div id="passwordHelp " className="form-text">
            Your password must be 8-20 characters long, contain letters and
            numbers, and must not contain spaces, special characters, or emoji.
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <button
            type="submit"
            className="btn btn-primary"
            onClick={handleSubmit}
          >
            Register
          </button>
        </div>
      </div>
      {state?.error && (
        <div className="row">
          <div className="col mt-3">
            <h6 className="text-danger text-center">{state.error}</h6>
          </div>
        </div>
      )}
    </form>
  );
};
