import { useState } from "react";
import { UOM } from "../config/units.config";
import { TextInput } from "./forms/input/TextInput";
import { Label } from "./forms/Label";
import { Select } from "./forms/select/Select";
import { SelectUnits } from "./forms/select/SelectUnits";

const ACTIVITY_VARIATIONS = [
  { id: 0, key: "outdoor", value: "Outdoor" },
  { id: 1, key: "indoor", value: "Indoor" },
  { id: 2, key: "machine", value: "Machine" },
  { id: 3, key: "trail", value: "trail" },
];

export const ManualActivityForm = () => {
  const [uom, setUom] = useState(UOM.IMPERIAL);
  const [values, setValues] = useState({
    label: "",
    hours: "",
    minutes: "",
    seconds: "",
    type: "",
    variation: "",
    gain: "0",
    loss: "0",
  });
  const handleUomChange = (event) => {
    setUom(event.target.value);
  };

  const handleValueChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const {
    label,
    hours,
    minutes,
    seconds,
    type,
    variation,
    gain,
    loss,
  } = values;
  return (
    <form>
      <div className="row">
        <div className="col-sm-12">
          <Label label="New Activity" />
        </div>
        <div className="col-sm-12">
          <span className="input-group">
            <Label label="Name" name="label" inputText={true} />
            <TextInput
              for="label"
              name="label"
              placeholder="Run through Central Park"
              id="label"
              value={label}
              onChange={handleValueChange}
            />
          </span>
        </div>
      </div>
      {/* row 2 */}
      <div className="row mt-2">
        <div className="col-sm-12">
          <Label label="Stats" />
        </div>

        <div className="col-sm-12 my-1">
          <SelectUnits uom={uom} onChangeUom={handleUomChange} />
        </div>

        <div className="col-sm-12">
          <span className="input-group">
            <Label label="Hrs" name="hours" inputText={true} />
            <TextInput
              for="hours"
              placeholder="0"
              name="hours"
              id="hours"
              value={hours}
              onChange={handleValueChange}
            />
            <Label label="Min" name="minutes" inputText={true} />
            <TextInput
              for="minutes"
              placeholder="0"
              name="minutes"
              id="minutes"
              value={minutes}
              onChange={handleValueChange}
            />
            <Label label="Sec" name="seconds" inputText={true} />
            <TextInput
              for="seconds"
              placeholder="0"
              name="seconds"
              id="seconds"
              value={seconds}
              onChange={handleValueChange}
            />
          </span>
        </div>
        <div className="col-sm-12 my-1">
          <div className="input-group">
            <Label label="Distance" name="distance" inputText={true} />
            <TextInput
              for="duration"
              placeholder="1.1"
              name="seconds"
              id="seconds"
              value={seconds}
              onChange={handleValueChange}
            />
            <Label
              label={uom === UOM.IMPERIAL ? "Miles" : "Kilometers"}
              name="distanceMeasure"
              inputText={true}
            />
          </div>
        </div>
        <div className="col-sm-6 mb-1">
          <span className="input-group">
            <Label label="Gain" inputText={true} />
            <TextInput
              id="gain"
              name="gain"
              onChange={handleValueChange}
              value={gain}
            />
            <Label
              label={uom === UOM.IMPERIAL ? "feet" : "meters"}
              name="distanceMeasure"
              inputText={true}
            />
          </span>
        </div>
        <div className="col-sm-6 mb-1">
          <span className="input-group">
            <Label label="Loss" inputText={true} />
            <TextInput
              id="loss"
              name="loss"
              onChange={handleValueChange}
              value={loss}
            />
            <Label
              label={uom === UOM.IMPERIAL ? "feet" : "meters"}
              name="distanceMeasure"
              inputText={true}
            />
          </span>
        </div>
      </div>

      <div className="row mt-2">
        <div className="col-sm-12">
          <Label label="Category" />
        </div>
        <div className="col-sm-12">
          <span className="input-group mb-1">
            <Label label="Type" name="type" inputText={true} />
            <TextInput
              for="type"
              placeholder="Running"
              name="type"
              id="type"
              value={type}
              onChange={handleValueChange}
            />
          </span>
          <span className="input-group mb-1">
            <Label label="Variation" name="categoryLabel" inputText={true} />
            <Select
              name="variation"
              id="variation"
              value={variation}
              onChange={handleValueChange}
              selectOptions={ACTIVITY_VARIATIONS}
            />
          </span>
        </div>
      </div>
    </form>
  );
};
