import { useEffect, useState } from "react";
import { CLASSES } from "../../config/app.config";
import { SelectBirthday } from "./select/SelectBirthday";
import { SelectHeight } from "./select/SelectHeight";
import { SelectUnits } from "./select/SelectUnits";
import { TextInput } from "./input/TextInput";
import { Label } from "./Label";
import { Toggle } from "../common/Toggle";
import { UOM } from "../../config/units.config";

export const EditProfile = ({ userData, updateUser }) => {
  const [editMode, setEditMode] = useState(false);
  const [fields, setFields] = useState({
    first: "",
    last: "",
    email: "",
  });
  const [birthday, setBirthday] = useState({
    day: 0,
    month: 0,
    year: 0,
  });
  const [centimeters, setCentimeters] = useState(0);
  const [uom, setUom] = useState(UOM.IMPERIAL);

  useEffect(() => {
    if (!userData) return;
    if (userData.first || userData.last || userData.email) {
      setFields({
        ...fields,
        first: userData.first || "",
        last: userData.last || "",
        email: userData.email || "",
      });
    }
    if (userData.day || userData.month || userData.year) {
      setBirthday({
        day: userData.day || 0,
        month: userData.month || 0,
        year: userData.year || 0,
      });
    }
    if (userData.height) {
      setCentimeters(userData.height);
    }
    // only should set when the data is retrieved from the api
    // eslint-disable-next-line
  }, [userData]);

  // event handler for changing the UOM
  const handleUomChange = (event) => {
    setUom(event.target.value);
  };

  // handle fieldValue change
  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    setFields({
      ...fields,
      [name]: value,
    });
  };

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    updateUser({
      ...fields,
      ...birthday,
      height: centimeters,
    });
  };

  // de-structure fields for form values
  const { first, last, email } = fields;

  return (
    <form className={CLASSES.DEFAULT.FORMS}>
      <div className="container pt-2">
        <div className="row">
          <div className="col pt-2">
            <h2>Edit Profile</h2>
          </div>
          <Toggle on={editMode} onClick={() => setEditMode(!editMode)} />
        </div>
      </div>

      <div className="container">
        <div className="row mb-3">
          <div className="col-sm-auto">
            <Label label="Name" />
          </div>
          <div className="col-sm-auto mb-2">
            <span className="input-group">
              <Label label="First" name="first" inputText={true} />
              <TextInput
                for="first"
                type="first"
                name="last"
                id="first"
                value={first}
                onChange={handleFieldChange}
                disabled={!editMode}
              />
            </span>
          </div>
          <div className="col-sm-auto mb-2">
            <span className={"input-group"}>
              <Label label="Last" name="last" inputText={true} />
              <TextInput
                for="last"
                type="text"
                name="last"
                label="Last Name"
                id="last"
                value={last}
                onChange={handleFieldChange}
                disabled={!editMode}
              />
            </span>
          </div>
        </div>
        <div className="col-sm-auto mb-3">
          <span className="input-group">
            <Label label="Email" name="email" inputText={true} />
            <TextInput
              for="email"
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={handleFieldChange}
              disabled={!editMode}
            />
          </span>
        </div>
      </div>

      <div className="container">
        <div className="row">
          <SelectBirthday
            birthday={birthday}
            setBirthday={setBirthday}
            disabled={!editMode}
          />
        </div>
      </div>

      <div className="container mb-3    ">
        <div className="row">
          <div className="col-sm-auto">
            <Label label="Height" />
          </div>
        </div>
        <div className="row">
          <div className="col-sm-auto mb-2">
            <SelectUnits
              uom={uom}
              onChangeUom={handleUomChange}
              disabled={!editMode}
            />
          </div>
          <div className="col-sm-auto mb-2">
            <SelectHeight
              cm={centimeters}
              setCm={setCentimeters}
              uom={uom}
              displayLabel={false}
              disabled={!editMode}
            />
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row">
          <div className="col-sm-auto">
            <button
              className="btn btn-primary"
              onClick={handleUpdateProfile}
              disabled={!editMode}
            >
              Update
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};
