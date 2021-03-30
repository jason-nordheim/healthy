import { MONTHS } from "../../config";
import { LabeledInput } from "./LabeledInput";
import { LabeledSelect } from "./LabeledSelect";

export const SelectBirthday = ({ birthday, setBirthday }) => {
  const handleBirthdayFieldChange = (event) => {
    setBirthday({
      ...birthday,
      [event.target.name]: event.target.value,
    });
  };
  const { day, month, year } = birthday;
  return (
    <>
      <label htmlFor="birthday" className="form-label">
        Birthday
      </label>
      <div className="col mb-3">
        <LabeledInput
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
        <LabeledSelect
          id="month"
          name="month"
          label="Month"
          value={month}
          required={true}
          onChange={handleBirthdayFieldChange}
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
          onChange={handleBirthdayFieldChange}
        />
      </div>
    </>
  );
};
