export const NUTRIENTS = {
  CA: {
    name: "Calcium",
    unit: "mg",
  },
  CHOCDF: {
    name: "Carbs",
    unit: "mg",
  },
  CHOLE: {
    name: "Cholesterol",
    unit: "mg",
  },
  FAMS: {
    name: "Monounsaturated",
    unit: "g",
  },
  FAPU: {
    name: "Polyunsaturated",
    unit: "g",
  },
  FASAT: {
    name: "Saturated",
    unit: "g",
  },
  FAT: {
    name: "Fat",
    unit: "g",
  },
  FATRN: {
    name: "Trans",
    unit: "g",
  },
  FE: {
    name: "Iron",
    unit: "mg",
  },
  FIBTG: {
    name: "Fiber",
    unit: "g",
  },
  FOLDFE: {
    name: "Folate",
    unit: "æg",
  },
  K: {
    name: "Potassium",
    unit: "mg",
  },
  MG: {
    name: "Magnesium",
    unit: "mg",
  },
  NA: {
    name: "Sodium",
    unit: "mg",
  },
  ENERC_KCAL: {
    name: "Energy",
    unit: "kcal",
  },
  NIA: {
    name: "Niacin (B3)",
    unit: "mg",
  },
  P: {
    name: "Phosphorus",
    unit: "mg",
  },
  PROCNT: {
    name: "Protein",
    unit: "g",
  },
  RIBF: {
    name: "Riboflavin (B2)",
    unit: "mg",
  },
  SUGAR: {
    name: "Sugars",
    unit: "g",
  },
  THIA: {
    name: "Thiamin (B1)",
    unit: "mg",
  },
  TOCPHA: {
    name: "Vitamin E",
    unit: "mg",
  },
  VITA_RAE: {
    name: "Vitamin A",
    unit: "æg",
  },
  VITB12: {
    name: "Vitamin B12",
    unit: "æg",
  },
  VITB6A: {
    name: "Vitamin B6",
    unit: "mg",
  },
  VITC: {
    name: "Vitamin C",
    unit: "mg",
  },
  VITD: {
    name: "Vitamin D",
    unit: "æg",
  },
  VITK1: {
    name: "Vitamin K",
    unit: "æg",
  },
};

export const CATEGORIES = [
  {
    category: "generic-foods",
    description:
      "Any general non-branded food i.e. searching “apple” with this category returns information on generic “apple” and its varieties.",
  },
  {
    category: "packaged-foods",
    description:
      "Any food that has been produced as a Consumer Packaged Good (CPG,) i.e. one of the results when searching “apple” returns an “Apple” packaged and branded from “Apple Country”",
  },
  {
    category: "generic-meals",
    description:
      "Any generic (non-branded) food that is composed of other basic foods, these will usually come with a list of ingredients. i.e. searching “apple” returns “Apple-Crisp Baked Apples”",
  },
  {
    category: "fast-foods",
    description:
      "Any food that is served by a chain-restaurant. i.e. searching “apple” returns “Apples” which are served by “bareburger”",
  },
];

export const CATEGORY_LABELS = [
  {
    label: "food",
    description:
      'refers to basic foods or food products (i.e. not composed of other foods,) equivalent of searching in both "generic-foods" and "packaged-foods"',
  },
  {
    label: "meal",
    description:
      'Refers to foods that are composed of basic foods, equivalent of searching in both "generic-meals" and "fast-foods"',
  },
];
