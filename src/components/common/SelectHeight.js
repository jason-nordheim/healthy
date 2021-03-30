import { IMPERIAL, METRIC, UOM } from "../../config";
import { convert } from "../../util/UnitUtilities";

export const SelectHeight = ({ uom, cmTall, setCmTall }) => {
  const heightUnits = uom === UOM.IMPERIAL ? IMPERIAL.HEIGHT : METRIC.HEIGHT;

  const handleHeightChange = (event) => {
    // convert the values to imperial if needed
    const num = +event.target.value;
    if (uom === UOM.IMPERIAL) {
      const cm = convert.inchesToCentimeters(num);
      setCmTall(cm);
    } else {
      setCmTall(num);
    }
  };

  return (
    <span className="input-group p-3">
      <label className="input-group-text" htmlFor="height">
        Height
      </label>
      <input
        className="form-control"
        type="number"
        name="height"
        id="height"
        value={cmTall}
        onChange={handleHeightChange}
      />
      <select
        className="form-select"
        name="height_units"
        id="height_units"
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
  );
};
