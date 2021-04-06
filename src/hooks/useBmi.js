import { useMemo } from "react";
import { BmiUtils } from "../util/BmiUtils";
export const useBmi = (kg, cm) => {
  const meters = useMemo(() => cm / 100, [cm]);
  const bmi = useMemo(() => BmiUtils.calculateBmi(kg, meters), [kg, meters]);
  return [bmi, meters];
};
