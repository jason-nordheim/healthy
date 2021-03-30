import { MONTHS } from "../../../config";
import { Label } from "../Label";
import { NumberInput } from "../input/NumberInput";
import { Select } from "./Select";

export const SelectBirthday = ({ birthday, setBirthday }) => {
  const options = MONTHS.map((m) => ({
    key: m.value,
    id: m.id,
    value: m.name,
  }));

  const handleBirthdayFieldChange = (event) => {
    setBirthday({
      ...birthday,
      [event.target.name]: event.target.value,
    });
  };
  const { day, month, year } = birthday;
  return (
    <div className="container">
      <div className="row">
        <label htmlFor="birthday" className="form-label">
          Birthday
        </label>
        <div className="row">
          <div className="col mb-3">
            <Label label="Day" name="day" />
            <NumberInput
              id="day"
              name="day"
              label="Day"
              value={day}
              onChange={handleBirthdayFieldChange}
              type="number"
              min={1}
              max={31}
            />
          </div>
          <div className="col mb-3">
            <Label label="Month" name="month" />
            <Select
              id="month"
              name="month"
              value={month}
              required={true}
              onChange={handleBirthdayFieldChange}
              selectOptions={options}
            />
          </div>
          <div className="col mb-3">
            <Label label="Year" name="year" />
            <NumberInput
              for="year"
              id="year"
              type="number"
              name="year"
              value={year}
              required={true}
              onChange={handleBirthdayFieldChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
