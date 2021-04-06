import { useEffect, useState } from "react";
import { DEFAULTS, UOM } from "../../config";
import { FormTitle } from "../forms/FormTitle";
import { SelectHeight } from "../forms/select/SelectHeight";
import { SelectWeight } from "../forms/select/SelectWeight";
import { SelectUnits } from "../forms/select/SelectUnits";

import { SubmitButton } from "../forms/input/SubmitButton";
import { BmiUtils, categories } from "../../util/BmiUtils";
import { BmiTable } from "./BmiTable";

const { calculateBmi, bmiCategory } = BmiUtils;
export const BmiCalculator = ({ profile = undefined }) => {
  const [cm, setCm] = useState(DEFAULTS.MEASUREMENTS.HEIGHT);
  const [kg, setKg] = useState(DEFAULTS.MEASUREMENTS.WEIGHT);
  const [uom, setUom] = useState(UOM.IMPERIAL);
  const [bmi, setBmi] = useState(0);
  const [category, setCategory] = useState(categories.normal);

  useEffect(() => {
    if (profile && profile.height) {
      setCm(profile.height);
    }
  }, [profile]);

  useEffect(() => {
    if (cm > 0 && kg > 0) {
      setBmi(calculateBmi(kg, cm / 100));
    }
  }, [cm, kg]);

  useEffect(() => {
    setCategory(bmiCategory(bmi));
  }, [bmi]);

  // event handler for changing the UOM
  const handleUomChange = (event) => setUom(event.target.value);
  return (
    <form className="container" onSubmit={(e) => e.preventDefault()}>
      <div className="row">
        <FormTitle title="BMI Calculator" />
      </div>

      <div className="row mb-2">
        <div className="col-sm-auto mb-1">
          <SelectUnits uom={uom} onChangeUom={handleUomChange} />
        </div>
      </div>
      <div className="row mb-1">
        <span className="col-sm-auto">
          <SelectHeight cm={cm} setCm={setCm} uom={uom} />
        </span>
      </div>
      <div className="row">
        <span className="col-sm-auto">
          <SelectWeight kg={kg} setKg={setKg} uom={uom} />
        </span>
      </div>

      <div className="row mt-3">
        <div className="col-sm-auto">
          <BmiTable category={category} meters={cm / 100} bmi={bmi} uom={uom} />
        </div>
      </div>

      <div className="row">
        <div className="col-sm-auto">
          {/* todo:  */}
          <SubmitButton label="Log" />
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
