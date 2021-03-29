import { useContext, useEffect, useState } from "react";
import { AuthActions, AuthContext } from "../../context/auth.context";
import { getProfile } from "../../util/ApiUtils";
import { LabeledInput } from "../common/LabeledInput";
import { LabeledSelect } from "../common/LabeledSelect";
import { TokenExpiredError } from "../../errors/TokenExpiredError";
import {
  DEFAULT_MEASUREMENTS,
  IMPERIAL,
  METRIC,
  MONTHS,
  UNITS,
  UOM,
} from "../../config";
import { convert } from "../../util/UnitUtilities";

const DEFAULT_FIELD_VALUES = {
  first: "",
  last: "",
  password: "",
};
const BIRTHDAY_DEFAULTS = {
  day: 1,
  month: MONTHS[0].id,
  year: 2000,
};
export const EditProfile = () => {
  const [state, dispatch] = useContext(AuthContext);
  const [fields, setFields] = useState(DEFAULT_FIELD_VALUES);
  const [birthday, setBirthday] = useState(BIRTHDAY_DEFAULTS);
  const [values, setValues] = useState(DEFAULT_MEASUREMENTS);
  const [measurements, setMeasurements] = useState(DEFAULT_MEASUREMENTS);
  const [uom, setUom] = useState(UOM.imperial);
  const [units, setUnits] = useState(UNITS.DEFAULT);

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

  // update the units of measure
  useEffect(() => {
    if (uom === UOM.metric) {
      setUnits(UNITS.METRIC);
    } else {
      setUnits(UNITS.IMPERIAL);
    }
  }, [uom]);

  // event handler for changing the UOM
  const handleUomChange = (event) => {
    setUom(event.target.value);
  };

  // event handler to update the form values whenever they change
  const handleMeasurementChange = (event) => {
    const { name, value } = event.target;

    // convert the values to imperial if needed
    if (uom === UOM.imperial) {
      if (name === "height") {
        const num = +value;
        const cm = convert.inchesToCentimeters(num);
        const updatedVals = { ...values, [name]: cm };
        setValues(updatedVals);
      } else if (name === "weight") {
        const num = +value;
        const kg = convert.poundsToKilograms(num);
        const updateVals = { ...value, [name]: kg };
        setValues(updateVals);
      } else {
        setValues({ ...values, [name]: value });
      }
    }

    // always update measurements values in state
    setMeasurements({ ...measurements, [name]: value });
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
                value={UOM.imperial}
                className={uom === UOM.imperial ? "selected" : ""}
              >
                {UOM.imperial}
              </option>
              <option
                value={UOM.metric}
                className={uom === UOM.metric ? "selected" : ""}
              >
                {UOM.metric}
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
              value={measurements.height}
              onChange={handleMeasurementChange}
            />
            <select
              className="form-select"
              name="h_units"
              id="h_units"
              readOnly
              disabled
              value={UNITS.height}
            >
              <option
                value={METRIC.height}
                className={UNITS.height === METRIC.height ? "selected" : ""}
              >
                {METRIC.height}
              </option>
              <option
                value={IMPERIAL.height}
                className={UNITS.height === IMPERIAL.height ? "selected" : ""}
              >
                {IMPERIAL.height}
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
