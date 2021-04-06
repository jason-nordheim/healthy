import { useEffect, useState, useMemo } from "react";
import { DEFAULTS, IMPERIAL, METRIC, UOM } from "../../../config";
import { convert } from "../../../util/UnitUtilities";
import { NumberInput } from "../input/NumberInput";
import { Label } from "../Label";

const { inchesToCentimeters, centimetersToInches } = convert;

const ImperialHeightSelect = ({ displayLabel, cm, setCm, min }) => {
  const [inches, setInches] = useState(min);
  const handleHeightChange = (event) => setInches(event.target.value);

  useEffect(() => {
    if (!cm || cm < 0) return;
    const converted = centimetersToInches(cm);
    if (converted === inches) return;
    setInches(converted);
    // effect should only run when the cm value is updated
    // eslint-disable-next-line
  }, [cm]);

  useEffect(() => {
    if (inches && inches > 0) setCm(inchesToCentimeters(inches));
  }, [inches, setCm]);

  return (
    <span className="input-group">
      {displayLabel && <Label label="Height" name="height" inputText={true} />}
      <NumberInput
        className="form-control"
        type="number"
        name="height"
        id="height"
        value={inches}
        min={min}
        onChange={handleHeightChange}
      />
      <select
        className="form-select"
        name="height_units"
        id="height_units"
        readOnly
        disabled
        value={IMPERIAL.HEIGHT}
      >
        <option value={METRIC.HEIGHT}>{METRIC.HEIGHT}</option>
        <option value={IMPERIAL.HEIGHT} className="selected">
          {IMPERIAL.HEIGHT}
        </option>
      </select>
    </span>
  );
};

//   useEffect(() => {
//     const num = parseInt(height);
//     // guard clause
//     if (isNaN(num)) return;
//     // convert
//     if (useImperial) setCm(inchesToCentimeters(num));
//     else setCm(num);
//   }, [height, useImperial, setCm]);

const MetricHeightSelect = ({ displayLabel, cm, setCm, min }) => {
  const [centimeters, setCentimeters] = useState(min);
  const handleHeightChange = (event) => setCentimeters(event.target.value);

  useEffect(() => {
    if (!cm || cm < 0 || cm === centimeters) return;
    setCentimeters(cm);
    // effect should only run when the cm value is updated
    // eslint-disable-next-line
  }, [cm]);

  useEffect(() => {
    if (centimeters && centimeters > 0) setCm(centimeters);
  }, [centimeters, setCm]);

  return (
    <span className="input-group">
      {displayLabel && <Label label="Height" name="height" inputText={true} />}
      <NumberInput
        className="form-control"
        type="number"
        name="height"
        id="height"
        value={centimeters}
        min={min}
        onChange={handleHeightChange}
      />
      <select
        className="form-select"
        name="height_units"
        id="height_units"
        readOnly
        disabled
        value={METRIC.HEIGHT}
      >
        <option value={METRIC.HEIGHT} className="selected">
          {METRIC.HEIGHT}
        </option>
        <option value={IMPERIAL.HEIGHT}>{IMPERIAL.HEIGHT}</option>
      </select>
    </span>
  );
};

export const SelectHeight = ({
  uom = UOM.IMPERIAL,
  cm = 0,
  setCm,
  displayLabel = true,
}) => {
  const useImperial = useMemo(() => uom === UOM.IMPERIAL, [uom]);
  const min = useMemo(
    () => (useImperial ? DEFAULTS.MIN.INCHES : DEFAULTS.MIN.CENTIMETERS),
    [useImperial]
  );

  return useImperial ? (
    <ImperialHeightSelect
      cm={cm}
      setCm={setCm}
      displayLabel={displayLabel}
      min={min}
    />
  ) : (
    <MetricHeightSelect
      cm={cm}
      setCm={setCm}
      displayLabel={displayLabel}
      min={min}
    />
  );
};
