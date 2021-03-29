import { useContext, useEffect, useState } from "react";
import { AuthActions, AuthContext } from "../../context/auth.context";
import { getProfile } from "../../util/ApiUtils";
import { LabeledInput } from "../common/LabeledInput";
import { TokenExpiredError } from "../../errors/TokenExpiredError";

const DEFAULT_FIELD_VALUES = {
  first: "",
  last: "",
};
export const EditProfile = () => {
  const [state, dispatch] = useContext(AuthContext);
  const [fields, setFields] = useState(DEFAULT_FIELD_VALUES);

  useEffect(() => {
    state?.token &&
      getProfile(state.token)
        .then((res) => {
          if (res.status === 403) throw new TokenExpiredError();
          return res.json();
        })
        .then((data) => {
          console.log(data);
        })
        .catch((error) => {
          if (typeof error === typeof new TokenExpiredError()) {
            //AuthActions.Logout(dispatch);
          }
        });
  }, [state.token]);

  const { first, last } = fields;

  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    setFields({
      ...fields,
      [name]: value,
    });
  };

  return (
    <form>
      <div className="row">
        <div className="col">
          <h2 className="text-center">Edit Profile</h2>
        </div>
      </div>
      <div className="row">
        <div className="col mb-3">
          <LabeledInput
            for="first"
            type="first"
            name="last"
            label="First Name"
            id="first"
            value={first}
            onChange={handleFieldChange}
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
            onChange={handleFieldChange}
          />
        </div>
      </div>
      <div className="row"></div>
    </form>
  );
};
