import { UOM } from "../../../config";

export const SelectUnits = ({ uom, onChangeUom }) => {
  return (
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
        onChange={onChangeUom}
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
