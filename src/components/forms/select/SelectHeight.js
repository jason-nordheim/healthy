import { useEffect, useState } from "react";
import { DEFAULTS, IMPERIAL, METRIC, UOM } from "../../../config";
import { convert } from "../../../util/UnitUtilities";
import { NumberInput } from "../input/NumberInput";
import { Label } from "../Label";

const { centimetersToInches, inchesToCentimeters } = convert;

export const SelectHeight = ({ uom = UOM.IMPERIAL, cm, setCm }) => {
  const useImperial = uom === UOM.IMPERIAL ? true : false;
  const heightUnits = useImperial ? IMPERIAL.HEIGHT : METRIC.HEIGHT;
  const [val, setVal] = useState(useImperial ? centimetersToInches(cm) : cm);
  const min = useImperial ? DEFAULTS.MIN.INCHES : DEFAULTS.MIN.CENTIMETERS;

  useEffect(() => {
    const num = parseInt(val);
    // guard clause
    if (isNaN(num)) return;
    // convert
    if (useImperial) setCm(inchesToCentimeters(num));
    else setCm(num);
  }, [val, useImperial, setCm]);

  const handleHeightChange = (event) => setVal(event.target.value);

  return (
    <span className="input-group">
      <Label label="Height" name="height" inputText={true} />
      <NumberInput
        className="form-control"
        type="number"
        name="height"
        id="height"
        value={val}
        min={min}
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
