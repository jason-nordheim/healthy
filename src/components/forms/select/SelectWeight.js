import { useEffect, useState } from "react";
import { DEFAULTS, IMPERIAL, METRIC, UOM } from "../../../config";
import { convert } from "../../../util/UnitUtilities";
import { NumberInput } from "../input/NumberInput";
import { Label } from "../Label";

const { poundsToKilograms, kilogramsToPounds } = convert;

export const SelectWeight = ({ uom, kg, setKg }) => {
  const useImperial = uom === UOM.IMPERIAL ? true : false;
  const weightUnits = useImperial ? IMPERIAL.WEIGHT : METRIC.WEIGHT;
  const min = useImperial ? DEFAULTS.MIN.POUNDS : DEFAULTS.MIN.KILOGRAMS;
  const initialValue = kg && useImperial ? kilogramsToPounds(kg) : kg;
  const [val, setVal] = useState(initialValue);

  useEffect(() => {
    const num = parseInt(val);
    // guard clause
    if (isNaN(num)) return;
    // convert and set
    if (num && useImperial) setKg(poundsToKilograms(num));
    else if (num && !useImperial) setKg(num);
  }, [val, setKg, useImperial]);

  const handleWeightChange = (event) => setVal(event.target.value);

  return (
    <span className="input-group p-3">
      <Label label="Weight" name="weight" inputText={true} />
      <NumberInput
        name="weight"
        id="weight"
        value={val}
        min={min}
        onChange={handleWeightChange}
      />
      <select
        className="form-select"
        name="w_units"
        id="w_units"
        value={weightUnits}
        readOnly
        disabled
        aria-readonly={"true"}
      >
        <option
          value={METRIC.WEIGHT}
          className={weightUnits === METRIC.WEIGHT ? "selected" : ""}
        >
          {METRIC.WEIGHT}
        </option>
        <option
          value={IMPERIAL.WEIGHT}
          className={weightUnits === IMPERIAL.WEIGHT ? "selected" : ""}
        >
          {IMPERIAL.WEIGHT}
        </option>
      </select>
    </span>
  );
};
