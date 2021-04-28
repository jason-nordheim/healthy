import { useEffect, useState } from "react";
import { convert } from "../../../util/UnitUtilities";
import { NumberInput } from "../input/NumberInput";
import { Label } from "../Label";
import { IMPERIAL, UOM, METRIC } from "../../../config/config.units";

const { poundsToKilograms } = convert;

export const SelectWeight = ({ uom, kg, setKg, disabled = false }) => {
  const useImperial = uom === UOM.IMPERIAL;
  const weightUnits = useImperial ? IMPERIAL.WEIGHT : METRIC.WEIGHT;
  const min = 0;
  const [weight, setWeight] = useState(0);

  useEffect(() => {
    const num = parseFloat(weight);
    // guard clause
    if (isNaN(num)) return;
    // convert and set
    if (num && useImperial) setKg(poundsToKilograms(num));
    else if (num && !useImperial) setKg(num);
  }, [weight, setKg, useImperial]);

  const handleWeightChange = (event) => setWeight(event.target.value);

  return (
    <span className="input-group">
      <Label label="Weight" name="weight" inputText={true} />
      <NumberInput
        name="weight"
        id="weight"
        value={weight}
        min={min}
        onChange={handleWeightChange}
        disabled={disabled}
      />
      <select
        className="form-select text-capitalize"
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
