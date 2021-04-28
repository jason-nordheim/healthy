import { useMemo, useState } from "react";
import { useAuthContext } from "../../../context/context.auth";

export const Login = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
    first: "",
    last: "",
    username: "",
    birthday: new Date(),
  });
  const { login } = useAuthContext();

  const canSubmit = useMemo(() => {
    if (values.password && values.username) return true;
    else return false;
  }, [values]);

  const handleSubmit = (e) => {
    e.preventDefault();
    login(values);
  };

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="row">
        <div className="col-auto my-2">
          <h1>Login</h1>
        </div>
      </div>
      <div className="row">
        <div className="col-sm-6 my-2">
          <div className="input-group">
            <div className="input-group-prepend">
              <label className="input-group-text" id="usernamelbl">
                Username
              </label>
            </div>
            <input
              type="text"
              aria-label="username"
              aria-describedby="usernamelbl"
              className="form-control"
              id="username"
              name="username"
              placeholder="Username"
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="col-sm-6 my-2">
          <div className="input-group">
            <div className="input-group-prepend">
              <label className="input-group-text" id="passwordLabel">
                Password
              </label>
            </div>
            <input
              type="password"
              aria-label="password"
              aria-describedby="passwordLabel"
              className="form-control"
              id="password"
              name="password"
              placeholder="Password"
              required
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
      <div className="row my-2">
        <div className="col text-center">
          <button
            type="submit"
            className="btn btn-primary"
            onClick={handleSubmit}
            disabled={!canSubmit}
          >
            Login
          </button>
        </div>
      </div>
    </form>
  );
};
