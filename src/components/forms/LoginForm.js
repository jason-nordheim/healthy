import { useContext, useState } from "react";
import { AuthActions, AuthContext } from "../../context/auth.context";

export const LoginForm = () => {
  const [state, dispatch] = useContext(AuthContext);
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formValues;
  const handleSubmit = (event) => {
    event.preventDefault();
    // todo: send user data to API to create an account
    const user = { email, password };
    AuthActions.Login(user, dispatch);
  };

  const handleFormValueChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="row">
        <div className="col mt-3 mb-3">
          <h2 className="text-center">Login</h2>
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
            Login
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
