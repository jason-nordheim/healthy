const thresholds = {
  underweight: 18.49,
  normal: 24.99,
  overweight: 29.99,
};

const delimitThresholds = 0.0000001;
export const categories = {
  underweight: {
    name: "underweight",
    minBmi: 0,
    maxBmi: thresholds.underweight,
    percent: 0,
  },
  normal: {
    name: "normal",
    minBmi: thresholds.underweight + delimitThresholds,
    maxBmi: thresholds.normal,
    percent: 0.25,
  },
  overweight: {
    name: "overweight",
    minBmi: thresholds.normal + delimitThresholds,
    maxBmi: thresholds.overweight,
    percent: 0.75,
  },
  obese: {
    name: "obese",
    minBmi: thresholds.overweight + delimitThresholds,
    maxBmi: 100,
    percent: 1,
  },
};

export const BmiUtils = {
  calculateBmi: (kg, meters) => kg / (meters * meters),
  bmiCategory: (bmi) => {
    if (bmi < thresholds.underweight) return categories.underweight;
    else if (bmi < thresholds.normal) return categories.normal;
    else if (bmi < thresholds.overweight) return categories.overweight;
    else return categories.obese;
  },
  underweightThresholdKg: (metersTall) => ({
    min: undefined,
    max: metersTall * metersTall * categories.underweight.maxBmi,
  }),
  normalThresholdKg: (metersTall) => ({
    min: metersTall * metersTall * categories.normal.minBmi,
    max: metersTall * metersTall * categories.normal.maxBmi,
  }),
  overweightThresholdKg: (metersTall) => ({
    min: metersTall * metersTall * categories.overweight.minBmi,
    max: metersTall * metersTall * categories.overweight.maxBmi,
  }),
  obeseThresholdKg: (metersTall) => ({
    min: metersTall * metersTall * categories.obese.minBmi,
    max: undefined,
  }),
};

export const convert = {
  inchesToCentimeters: (inches) => inches * 2.54,
  centimetersToInches: (centimeters) => centimeters / 2.54,
  poundsToKilograms: (pounds) => pounds / 2.205,
  kilogramsToPounds: (kilograms) => kilograms * 2.205,
};
