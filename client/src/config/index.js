import { AppRoutes } from "./config.routes";
import { IMPERIAL, METRIC, UOM } from "./config.units";
import { NUTRIENTS } from "./config.edamin";
import { API_ROUTES } from "./config.api";

const APP_NAME = "Healthy";

const MONTHS = [
  { id: 1, name: "January", abbr: "JAN" },
  { id: 2, name: "February", abbr: "FEB" },
  { id: 3, name: "March", abbr: "MAR" },
  { id: 4, name: "April", abbr: "APR" },
  { id: 5, name: "May", abbr: "MAY" },
  { id: 6, name: "June", abbr: "JUN" },
  { id: 7, name: "July", abbr: "JUL" },
  { id: 8, name: "August", abbr: "AUG" },
  { id: 9, name: "September", abbr: "SEP" },
  { id: 10, name: "October", abbr: "OCT" },
  { id: 11, name: "November", abbr: "NOV" },
  { id: 12, name: "December", abbr: "DEC" },
];

const CONSTANTS = {
  APP_NAME,
  MONTHS,
  MEASUREMENTS: {
    IMPERIAL,
    METRIC,
    UOM,
  },
  NUTRIENTS,
};

export { AppRoutes, CONSTANTS, API_ROUTES };
