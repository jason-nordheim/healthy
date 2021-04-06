import { useState } from "react";
import { CLASSES, UOM } from "../../config";
import { SelectBirthday } from "./select/SelectBirthday";
import { SelectHeight } from "./select/SelectHeight";
import { SelectUnits } from "./select/SelectUnits";
import { FormTitle } from "./FormTitle";
import { TextInput } from "./input/TextInput";
import { Label } from "./Label";

export const EditProfile = ({ userData, updateUser }) => {
  const [fields, setFields] = useState({
    first: userData.first,
    last: userData.last,
    email: userData.email,
  });
  const [birthday, setBirthday] = useState({
    day: userData.day,
    month: userData.month,
    year: userData.year,
  });
  const [centimeters, setCentimeters] = useState(userData.height || 0);
  const [uom, setUom] = useState(UOM.IMPERIAL);

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
      <div className="row">
        <div className="col">
          <FormTitle title="Edit Profile" />
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
              />
            </span>
          </div>
          <div className="col-sm-auto mb-2">
            <span className="input-group">
              <Label label="Last" name="last" inputText={true} />
              <TextInput
                for="last"
                type="text"
                name="last"
                label="Last Name"
                id="last"
                value={last}
                onChange={handleFieldChange}
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
            />
          </span>
        </div>
      </div>

      <div className="container">
        <div className="row">
          <SelectBirthday birthday={birthday} setBirthday={setBirthday} />
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
            <SelectUnits uom={uom} onChangeUom={handleUomChange} />
          </div>
          <div className="col-sm-auto mb-2">
            <SelectHeight
              cm={centimeters}
              setCm={setCentimeters}
              uom={uom}
              displayLabel={false}
            />
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row">
          <div className="col-sm-auto">
            <button className="btn btn-primary" onClick={handleUpdateProfile}>
              Update
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};
