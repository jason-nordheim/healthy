const thresholds = {
  underweight: 18.5,
  normal: 25,
  overweight: 30,
};

const delimitThresholds = 0.0000001;

export const BmiUtils = {
  calculateBmi: (kg, meters) => kg / (meters * meters),
  bmiCategory: (bmi) => {
    if (bmi < categories.underweight.upperThreshold)
      return categories.underweight;
    else if (bmi < categories.normal.upperThreshold) return categories.normal;
    else if (bmi < categories.overweight.upperThreshold)
      return categories.overweight;
    else return categories.obese;
  },
  underweightThresholdKg: (metersTall) => ({
    min: undefined,
    max: metersTall * metersTall * thresholds.normal - delimitThresholds,
  }),
  normalThresholdKg: (metersTall) => ({
    min: metersTall * metersTall * thresholds.normal,
    max: metersTall * metersTall * thresholds.overweight,
  }),
  overweightThresholdKg: (metersTall) => ({
    min: metersTall * metersTall * thresholds.overweight + delimitThresholds,
    max: metersTall * metersTall * thresholds.overweight,
  }),
  obeseThresholdKg: (metersTall) => ({
    min: metersTall * metersTall * thresholds.overweight + delimitThresholds,
    max: undefined,
  }),
};

export const categories = {
  underweight: {
    name: "underweight",
    lowerThreshold: 0,
    upperThreshold: 18.5,
    percent: 0,
  },
  normal: {
    name: "normal",
    lowerThreshold: 18.5,
    upperThreshold: 24.9,
    percent: 0.25,
  },
  overweight: {
    name: "overweight",
    lowerThreshold: 24.9,
    upperThreshold: 29.9,
    percent: 0.75,
  },
  obese: {
    name: "obese",
    lowerThreshold: 29.9,
    upperThreshold: 100,
    percent: 1,
  },
};

export const convert = {
  inchesToCentimeters: (inches) => inches * 2.54,
  centimetersToInches: (centimeters) => centimeters / 2.54,
  poundsToKilograms: (pounds) => pounds / 2.205,
  kilogramsToPounds: (kilograms) => kilograms * 2.205,
};
