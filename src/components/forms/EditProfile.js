import { useContext, useEffect, useState } from "react";
import { AuthActions, AuthContext } from "../../context/auth.context";
import { getProfile } from "../../util/ApiUtils";
import { LabeledInput } from "../common/LabeledInput";
import { LabeledSelect } from "../common/LabeledSelect";
import { TokenExpiredError } from "../../errors/TokenExpiredError";
import { MONTHS, IMPERIAL, METRIC, UOM, DEFAULTS } from "../../config";
import { convert } from "../../util/UnitUtilities";

export const EditProfile = () => {
  const [state, dispatch] = useContext(AuthContext);
  const [fields, setFields] = useState(DEFAULTS.USER);
  const [birthday, setBirthday] = useState(DEFAULTS.BIRTHDAY);
  const [centimeters, setCentimeters] = useState(DEFAULTS.MEASUREMENTS.HEIGHT);
  const [displayHeight, setDisplayHeight] = useState(
    DEFAULTS.MEASUREMENTS.HEIGHT
  );
  const [uom, setUom] = useState(UOM.IMPERIAL);
  const [heightUnits, setHeightUnits] = useState(DEFAULTS.UNITS.HEIGHT);

  // retrieve user profile when the component mounts
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
            console.log("error", error);
            //AuthActions.Logout(dispatch);
          }
        });
  }, [state.token]);

  // event handler for changing the UOM
  const handleUomChange = (event) => {
    setUom(event.target.value);
    if (uom == UOM.IMPERIAL) setHeightUnits(IMPERIAL.HEIGHT);
    else if (uom === UOM.METRIC) setHeightUnits(METRIC.WEIGHT);
  };

  // event handler to update the form values whenever they change
  const handleHeightChange = (event) => {
    // convert the values to imperial if needed
    const num = +event.target.value;
    if (uom === UOM.IMPERIAL) {
      const cm = convert.inchesToCentimeters(num);
      setCentimeters(cm);
    } else {
      setCentimeters(num);
    }
    // always update measurements values in state
    setDisplayHeight(num);
  };

  // handle fieldValue change
  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    setFields({
      ...fields,
      [name]: value,
    });
  };

  // birthday onChange event handler
  const handleBirthdayChange = (event) => {
    const { name, value } = event.target;
    setBirthday({ ...birthday, [name]: value });
  };

  // de-structure fields for form values
  const { day, month, year } = birthday;
  const { first, last, password } = fields;

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
        <div className="col">
          <span className="input-group p-3">
            <label className="input-group-text" htmlFor="uom">
              Unit of Measure
            </label>
            <select
              className="form-select"
              aria-label="Unit of Measurement"
              name="uom"
              id="uom"
              value={uom}
              onChange={handleUomChange}
            >
              <option
                value={UOM.IMPERIAL}
                className={uom === UOM.IMPERIAL ? "selected" : ""}
              >
                {UOM.IMPERIAL}
              </option>
              <option
                value={UOM.METRIC}
                className={uom === UOM.METRIC ? "selected" : ""}
              >
                {UOM.METRIC}
              </option>
            </select>
          </span>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <span className="input-group p-3">
            <label className="input-group-text" htmlFor="height">
              Height
            </label>
            <input
              className="form-control"
              type="number"
              name="height"
              id="height"
              value={displayHeight}
              onChange={handleHeightChange}
            />
            <select
              className="form-select"
              name="height"
              id="height"
              readOnly
              disabled
              value={heightUnits}
            >
              <option
                value={METRIC.HEIGHT}
                className={heightUnits === METRIC.HEIGHT ? "selected" : ""}
              >
                {METRIC.HEIGHT}
              </option>
              <option
                value={IMPERIAL.HEIGHT}
                className={heightUnits === IMPERIAL.HEIGHT ? "selected" : ""}
              >
                {IMPERIAL.HEIGHT}
              </option>
            </select>
          </span>
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
            onChange={handleFieldChange}
          />
          <div id="passwordHelp " className="form-text">
            Your password must be 8-20 characters long, contain letters and
            numbers, and must not contain spaces, special characters, or emoji.
          </div>
        </div>
      </div>
    </form>
  );
};
