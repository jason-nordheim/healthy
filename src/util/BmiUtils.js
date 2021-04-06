import { convert, round } from "./UnitUtilities";

const thresholds = {
  underweight: 18.49,
  normal: 24.99,
  overweight: 29.99,
};

const delimitThresholds = 0.0000001;

/**
 * Define the different BMI categories
 */
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

const weightRangeLb = (height, category) => {
  const kgRange = weightRangeKg(height, category);
  return {
    min: convert.kilogramsToPounds(kgRange.min),
    max: convert.kilogramsToPounds(kgRange.max),
  };
};

/**
 * Calculates the minumum and maximum weight in kilograms for each BMI category
 * @param {Number} height (meters)
 * @returns
 */
const weightRangeKg = (height, category) => {
  switch (category) {
    case categories.underweight.name:
      return {
        min: undefined,
        max: height * height * categories.underweight.maxBmi,
      };
    case categories.normal.name:
      return {
        min: height * height * categories.normal.minBmi,
        max: height * height * categories.normal.maxBmi,
      };
    case categories.overweight.name:
      return {
        min: height * height * categories.overweight.minBmi,
        max: height * height * categories.overweight.maxBmi,
      };
    case categories.obese.name:
      return {
        min: height * height * categories.obese.minBmi,
        max: undefined,
      };
    default:
      throw new Error(`Invalid Category: ${category}`);
  }
};

/**
 * Determines the range (min/max) for each BMI category
 * @param {Number} height in meters
 * @returns object containing the ranges for each BMI category
 */
const kgRange = (height) => {
  return {
    underweight: weightRangeKg(height, categories.underweight.name),
    normal: weightRangeKg(height, categories.normal.name),
    overweight: weightRangeKg(height, categories.overweight.name),
    obese: weightRangeKg(height, categories.obese.name),
  };
};

/**
 *
 * @param {Number} height in
 */
const lbRange = (height) => {
  return {
    underweight: weightRangeLb(height, categories.underweight.name),
    normal: weightRangeLb(height, categories.normal.name),
    overweight: weightRangeLb(height, categories.overweight.name),
    obese: weightRangeLb(height, categories.obese.name),
  };
};

/**
 * Retrieve BMI category
 * @param {Number} bmi BMI index value
 * @returns associated BMI category object
 */
const bmiCategory = (bmi) => {
  const { underweight, normal, overweight, obese } = categories;
  if (bmi < thresholds.underweight) return underweight;
  else if (bmi < thresholds.normal) return normal;
  else if (bmi < thresholds.overweight) return overweight;
  else return obese;
};

/**
 * Calculates a person's BMI based on height and weight
 * @param {Number} kg weight in kilograms
 * @param {Number} meters height in meters
 * @returns
 */
const calculateBmi = (kg, meters) => kg / (meters * meters);

/**
 * Creates a human readable string
 * @param {{min: number, max: number}} range
 * @returns {string}
 */
const formatRangeToString = (range) => {
  const min = range.min || undefined;
  const max = range.max || undefined;
  if (min && max) return `${round(min)} - ${round(max)}`;
  if (!min && max) return `under ${round(max)}`;
  if (min && !max) return `over ${round(min)}`;
};

export const BmiUtils = {
  calculateBmi,
  bmiCategory,
  kgRange,
  lbRange,
  formatRangeToString,
};
