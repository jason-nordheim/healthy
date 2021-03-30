import { useState } from "react";
import { DEFAULTS, UOM } from "../../config";
import { FormTitle } from "../forms/FormTitle";
import { SelectHeight } from "../forms/select/SelectHeight";
import { SelectWeight } from "../forms/select/SelectWeight";
import { SelectUnits } from "../forms/select/SelectUnits";

import { BmiChart } from "./BmiChart";
import { SubmitButton } from "../forms/input/SubmitButton";
import { BmiUtils } from "../../util/BmiUtils";

export const BmiCalculator = () => {
  const [cm, setCM] = useState(DEFAULTS.MEASUREMENTS.HEIGHT);
  const [kg, setKg] = useState(DEFAULTS.MEASUREMENTS.WEIGHT);
  const [uom, setUom] = useState(UOM.IMPERIAL);

  const meters = cm / 100; // convert from centimeters
  const bmi = BmiUtils.calculateBmi(kg, meters);

  const showChart = kg && cm && bmi && bmi > 10 && bmi < 100 ? true : false;
  console.log({ bmi, kg, cm, showChart });

  // event handler for changing the UOM
  const handleUomChange = (event) => setUom(event.target.value);

  return (
    <form className="container" onSubmit={(e) => e.preventDefault()}>
      <div className="container">
        <div className="row">
          <FormTitle title="BMI Calculator" />
        </div>
      </div>

      <div className="row">
        <div className="col">
          <SelectUnits uom={uom} onChangeUom={handleUomChange} />
        </div>
      </div>
      <div className="row">
        <div className="col">
          <SelectHeight cm={cm} setCm={setCM} uom={uom} />
        </div>
        <div className="col">
          <SelectWeight kg={kg} setKg={setKg} uom={uom} />
        </div>
      </div>

      {showChart && <BmiChart meters={meters} bmi={bmi} />}
      <div className="container">
        <div className="row">
          <div className="col">
            {/* todo:  */}
            <SubmitButton label="Record" />
          </div>
        </div>
      </div>
    </form>
  );
};

/**
 * 
 * 
  // update the units of measure
  useEffect(() => {
    if (uom === UOM.metric) {
      setUnits(METRIC);
    } else {
      setUnits(IMPERIAL);
    }
  }, [uom]);

  // event handler for changing the value of the
  const handleUomChange = (event) => {
    setUom(event.target.value);
  };

  // function to determine if the chart should be shown
  const showChart = () => {
    const MIN_KG = 14; // 30.8 pounds
    const MIN_CM = 40; // 15.75 inches
    if (!values) return false;
    else if (!values.height) return false;
    else if (!values.weight) return false;
    else if (!values.height > MIN_CM) return false;
    else if (!values.weight > MIN_KG) return false;
    else return true;
  };

  // event handler to update the form values whenever they change
  const handleMeasurementChange = (event) => {
    const { name, value } = event.target;

    // convert the values to imperial if needed
    if (uom === UOM.imperial) {
      if (name === "height") {
        const num = +value;
        const cm = convert.inchesToCentimeters(num);
        const updatedVals = { ...values, [name]: cm };
        setValues(updatedVals);
      } else if (name === "weight") {
        const num = +value;
        const kg = convert.poundsToKilograms(num);
        const updateVals = { ...value, [name]: kg };
        setValues(updateVals);
      } else {
        setValues({ ...values, [name]: value });
      }
    }

    // always update measurements values in state
    setMeasurements({ ...measurements, [name]: value });
  };
 * 
 */
