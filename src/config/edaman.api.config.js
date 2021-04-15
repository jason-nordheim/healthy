export const NUTRIENTS = {
  ENERC_KCAL: {
    name: "Energy",
    unit: "kcal",
    value: null,
    initialValue: 0,
  },
  FAT: {
    name: "Fat",
    unit: "g",
    value: null,
    initialValue: 0,
  },
  CA: {
    name: "Calcium",
    unit: "mg",
    value: null,
    initialValue: 0,
  },
  CHOCDF: {
    name: "Carbs",
    unit: "mg",
    value: null,
    initialValue: 0,
  },
  CHOLE: {
    name: "Cholesterol",
    unit: "mg",
    value: null,
    initialValue: 0,
  },
  FAMS: {
    name: "Monounsaturated",
    unit: "g",
    value: null,
    initialValue: 0,
  },
  FAPU: {
    name: "Polyunsaturated",
    unit: "g",
    value: null,
    initialValue: 0,
  },
  FASAT: {
    name: "Saturated",
    unit: "g",
    value: null,
    initialValue: 0,
  },

  FATRN: {
    name: "Trans",
    unit: "g",
    value: null,
    initialValue: 0,
  },
  FE: {
    name: "Iron",
    unit: "mg",
    value: null,
    initialValue: 0,
  },
  FIBTG: {
    name: "Fiber",
    unit: "g",
    value: null,
    initialValue: 0,
  },
  FOLDFE: {
    name: "Folate",
    unit: "æg",
    value: null,
    initialValue: 0,
  },
  K: {
    name: "Potassium",
    unit: "mg",
    value: null,
    initialValue: 0,
  },
  MG: {
    name: "Magnesium",
    unit: "mg",
    value: null,
    initialValue: 0,
  },
  NA: {
    name: "Sodium",
    unit: "mg",
    value: null,
    initialValue: 0,
  },

  NIA: {
    name: "Niacin (B3)",
    unit: "mg",
    value: null,
  },
  P: {
    name: "Phosphorus",
    unit: "mg",
    value: null,
    initialValue: 0,
  },
  PROCNT: {
    name: "Protein",
    unit: "g",
    value: null,
  },
  RIBF: {
    name: "Riboflavin (B2)",
    unit: "mg",
    value: null,
    initialValue: 0,
  },
  SUGAR: {
    name: "Sugars",
    unit: "g",
    value: null,
    initialValue: 0,
  },
  THIA: {
    name: "Thiamin (B1)",
    unit: "mg",
    value: null,
    initialValue: 0,
  },
  TOCPHA: {
    name: "Vitamin E",
    unit: "mg",
    value: null,
    initialValue: 0,
  },
  VITA_RAE: {
    name: "Vitamin A",
    unit: "æg",
    value: null,
    initialValue: 0,
  },
  VITB12: {
    name: "Vitamin B12",
    unit: "æg",
    value: null,
  },
  VITB6A: {
    name: "Vitamin B6",
    unit: "mg",
    value: null,
    initialValue: 0,
  },
  VITC: {
    name: "Vitamin C",
    unit: "mg",
    value: null,
  },
  VITD: {
    name: "Vitamin D",
    unit: "æg",
    value: null,
    initialValue: 0,
  },
  VITK1: {
    name: "Vitamin K",
    unit: "æg",
    value: null,
    initialValue: 0,
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
