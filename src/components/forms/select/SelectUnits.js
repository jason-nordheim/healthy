import { UOM } from "../../../config";

export const SelectUnits = ({ uom, onChangeUom, disabled = false }) => {
  return (
    <span className="input-group">
      <label className="input-group-text fw-light" htmlFor="uom">
        Units
      </label>
      <select
        className="form-select"
        aria-label="Unit of Measurement"
        name="uom"
        id="uom"
        value={uom}
        onChange={onChangeUom}
        disabled={disabled}
        readOnly={disabled}
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
  );
};
