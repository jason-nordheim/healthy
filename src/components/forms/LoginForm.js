import { useState } from "react";
import { MONTHS, SERVER_URI } from "../../config";

export const LoginForm = () => {
  const [error, setError] = useState("");
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formValues;
  const handleSubmit = (event) => {
    event.preventDefault();
    // todo: send user data to API to create an account
    const user = { email, password };
    fetch(SERVER_URI.routes.loginUser, {
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
        console.log("data", data);
      })
      .catch((error) => {
        console.error(error);
        setError(error); // todo: Find use-case
      });
  };

  const handleFormValueChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="row">
        <div className="col">
          <h3>Login</h3>
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
            required
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
            id="password"
            value={password}
            required
            onChange={handleFormValueChange}
          />
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
