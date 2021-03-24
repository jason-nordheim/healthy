import { useState } from "react";
import { MONTHS, SERVER_URI } from "../../config";

export const RegisterForm = () => {
  const [formValues, setFormValues] = useState({
    first: "",
    last: "",
    email: "",
    password: "",
  });
  const [birthday, setBirthday] = useState({
    day: 1,
    month: MONTHS[0].id,
    year: 2000,
  });
  const { first, last, email, password } = formValues;
  const { day, month, year } = birthday;
  const handleSubmit = (event) => {
    event.preventDefault();
    // todo: send user data to API to create an account
    const user = {
      first,
      last,
      email,
      password,
      day,
      month,
      year,
    };
    fetch(SERVER_URI.routes.registerUser, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user }),
    });
  };
  const handleBirthdayChange = (event) => {
    const { name, value } = event.target;
    setBirthday({ ...birthday, [name]: value });
  };
  const handleFormValueChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };
  return (
    <form onSubmit={handleSubmit}>
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
            onChange={handleFormValueChange}
          />
        </div>
      </div>
      <div className="row">
        <div className="col mb-3">
          <label htmlFor="first" className="form-label">
            Last Name
          </label>
          <input
            type="text"
            name="last"
            className="form-control"
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
          <label htmlFor="day" className="form-label">
            Day
          </label>
          <input
            className="form-control"
            type="number"
            name="day"
            id="day"
            min="1"
            max="31"
            value={day}
            onChange={handleBirthdayChange}
          />
        </div>
        <div className="col mb-3">
          <label htmlFor="month" className="form-label">
            Month
          </label>
          <select
            name="month"
            id="month"
            name="month"
            className="form-select"
            value={month}
            onChange={handleBirthdayChange}
          >
            {MONTHS.map((m) => {
              return m.id === month ? (
                <option
                  key={m.value}
                  id={m.id}
                  value={m.id}
                  className="selected"
                >
                  {m.name}
                </option>
              ) : (
                <option key={m.value} id={m.id} value={m.id}>
                  {m.name}
                </option>
              );
            })}
          </select>
        </div>
        <div className="col mb-3">
          <label className="form-label" htmlFor="year">
            Year
          </label>
          <input
            className="form-control"
            type="number"
            name="year"
            id="year"
            value={year}
            onChange={handleBirthdayChange}
          />
        </div>
      </div>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">
          Email address
        </label>
        <input
          type="email"
          className="form-control"
          name="email"
          id="email"
          value={email}
          onChange={handleFormValueChange}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="exampleInputPassword1" className="form-label">
          Password
        </label>
        <input
          type="password"
          name="password"
          className="form-control"
          id="exampleInputPassword1"
          aria-describedby="passwordHelpBlock"
          value={password}
          onChange={handleFormValueChange}
        />
        <div id="passwordHelpBlock" className="form-text">
          Your password must be 8-20 characters long, contain letters and
          numbers, and must not contain spaces, special characters, or emoji.
        </div>
      </div>

      <button type="submit" className="btn btn-primary" onClick={handleSubmit}>
        Register
      </button>
    </form>
  );
};
