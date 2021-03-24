import { useState } from "react";
import { MONTHS, SERVER_URI } from "../../config";

export const RegisterForm = () => {
  const [error, setError] = useState("");
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
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          setError(data.error);
        }
        // todo: handle success event
        console.log("data", data);
      })
      .catch((error) => {
        console.error(error);
        setError(error);
      });
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
        <div className="col mb-3">
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
      </div>
      <div className="row">
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
      {error && (
        <div className="row">
          <div className="col mt-3">
            <h6 className="text-danger text-center">{error}</h6>
          </div>
        </div>
      )}
    </form>
  );
};
