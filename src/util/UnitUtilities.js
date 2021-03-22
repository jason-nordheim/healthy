export const convert = {
  inchesToCentimeters: (inches) => inches * 2.54,
  centimetersToInches: (centimeters) => centimeters / 2.54,
  poundsToKilograms: (pounds) => pounds / 2.205,
  kilogramsToPounds: (kilograms) => kilograms * 2.205,
};

export const round = (number, decimals = 2) => {
  return Intl.NumberFormat("en-us", {
    maximumFractionDigits: decimals,
  }).format(number);
};
