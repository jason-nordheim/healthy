import { useEffect, useMemo, useState } from "react";
import { useAuthContext } from "../../../context/context.auth";
import { useToken } from "../../../hooks/useToken";
import { Redirect } from "react-router-dom";
import { convertDateToString } from "../../../helpers";

export const EditProfile = () => {
  const [error, setError] = useState("");
  const [profileRetrieved, setProfileRetrieved] = useState(false);
  const [values, setValues] = useState({
    email: "",
    password: "",
    first: "",
    last: "",
    username: "",
    birthday: convertDateToString(new Date()),
  });
  const { state } = useAuthContext();

  const withToken = useToken(state.token);

  useEffect(() => {
    // on page load, use the jwt token to retrieve the user information
    if (profileRetrieved) return;
    const retrieveProfile = async () => {
      setProfileRetrieved(true);
      try {
        const response = await withToken.getProfile();
        if (response.status === 200) {
          const {
            first,
            last,
            email,
            username,
            birthday,
            height,
          } = response.data;
          const newValues = {
            first,
            last,
            email,
            username,
            birthday: convertDateToString(new Date(birthday)),
            height,
          };
          console.log({ newValues });
          setValues(newValues);
          console.log(values);
        } else {
          setError("failed to retrieve profile");
        }
      } catch (error) {
        console.log({ error });
        setError(JSON.stringify(error));
      }
    };
    retrieveProfile();
  }, [withToken, values, profileRetrieved]);

  const canSubmit = useMemo(() => {
    if (
      values.email &&
      values.password &&
      values.first &&
      values.last &&
      values.username
    )
      return true;
    else return false;
  }, [values]);

  const handleSubmit = (e) => {
    e.preventDefault();
    //actions.register(values);
  };

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };
  // redirect if no token
  return !state.token ? (
    <Redirect to="/account" />
  ) : (
    <form onSubmit={handleSubmit}>
      <div className="row">
        <div className="col-auto my-2">
          <h1>My Information</h1>
        </div>
      </div>
      <div className="row">
        <div className="col-sm-6 my-2">
          <div className="input-group">
            <div className="input-group-prepend">
              <label className="input-group-text" id="firstLabel">
                First
              </label>
            </div>
            <input
              type="text"
              aria-label="first"
              aria-describedby="firstLabel"
              className="form-control"
              id="first"
              name="first"
              placeholder="First"
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="col-sm-6 my-2">
          <div className="input-group">
            <div className="input-group-prepend">
              <label className="input-group-text" id="lastLabel">
                Last
              </label>
            </div>
            <input
              type="text"
              aria-label="last"
              aria-describedby="lastLabel"
              className="form-control"
              id="last"
              name="last"
              placeholder="Last"
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="col-sm-4 my-2">
          <div className="input-group">
            <div className="input-group-prepend">
              <label
                htmlFor="birthday"
                className="input-group-text"
                id="birthdaylbl"
              >
                Birthday
              </label>
            </div>
            <input
              type="date"
              name="birthday"
              id="birthday"
              aria-label="birthday"
              aria-describedby="birthdaylbl"
              className="form-control"
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="col-sm-8 my-2 ">
          <div className="input-group">
            <div className="input-group-prepend">
              <label className="input-group-text" id="emailLabel">
                Email
              </label>
            </div>
            <input
              type="email"
              aria-label="email"
              aria-describedby="emailLabel"
              className="form-control"
              id="email"
              name="email"
              placeholder="Email"
              onChange={handleChange}
              required
            />
          </div>
        </div>
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
            Update
          </button>
        </div>
      </div>
      {error && (
        <div
          id="error"
          className="row my-2 text-center"
          style={{ color: "red" }}
        >
          <p className="py-2">{error}</p>
        </div>
      )}
    </form>
  );
};
