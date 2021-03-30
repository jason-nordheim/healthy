/**
 * returns the equivalent number of inches
 * @param {Number} inches
 * @returns
 */
const inchesToCentimeters = (inches) => inches * 2.54;

/**
 * returns the equivalent number of inches
 * @param {Number} centimeters
 * @returns {Number} inches
 */
const centimetersToInches = (centimeters) => centimeters / 2.54;

/**
 * return the equivalent number of kilograms
 * @param {Number} pounds
 * @returns {Number} kilograms
 */
const poundsToKilograms = (pounds) => pounds / 2.205;

/**
 * returns the equivalent number of pounds
 * @param {Number} kilograms
 * @returns {Number} pounds
 */
const kilogramsToPounds = (kilograms) => kilograms * 2.205;

export const convert = {
  inchesToCentimeters,
  centimetersToInches,
  poundsToKilograms,
  kilogramsToPounds,
};

export const round = (number, decimals = 2) => {
  return Intl.NumberFormat("en-us", {
    maximumFractionDigits: decimals,
  }).format(number);
};
