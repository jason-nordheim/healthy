import { MONTHS } from "../../../config/app.config";
import { Label } from "../Label";
import { NumberInput } from "../input/NumberInput";
import { Select } from "./Select";

export const SelectBirthday = ({ birthday, setBirthday, disabled = false }) => {
  const options = MONTHS.map((m) => ({
    key: m.value,
    id: m.id,
    value: m.id,
  }));

  const handleBirthdayFieldChange = (event) => {
    setBirthday({
      ...birthday,
      [event.target.name]: event.target.value,
    });
  };
  const { day, month, year } = birthday;
  return (
    <div className="container mb-3">
      <div className="row">
        <div className="row">
          <Label label="Birthday" />
        </div>
        <div className="row">
          <div className="col-sm-auto mb-2">
            <span className="input-group">
              <Label label="Day" name="day" inputText={true} />
              <NumberInput
                id="day"
                name="day"
                label="Day"
                value={day}
                onChange={handleBirthdayFieldChange}
                type="number"
                min={1}
                max={31}
                disabled={disabled}
              />
            </span>
          </div>
          <div className="col-sm-auto mb-2">
            <span className="input-group">
              <Label label="Month" name="month" inputText={true} />
              <Select
                id="month"
                name="month"
                value={month}
                required={true}
                onChange={handleBirthdayFieldChange}
                selectOptions={options}
                disabled={disabled}
              />
            </span>
          </div>
          <div className="col-sm-auto mb-3">
            <span className="input-group">
              <Label label="Year" name="year" inputText={true} />
              <NumberInput
                for="year"
                id="year"
                type="number"
                name="year"
                value={year}
                required={true}
                onChange={handleBirthdayFieldChange}
                disabled={disabled}
              />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
