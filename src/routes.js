import { HomePage } from "./components/pages/HomePage";
import { BmiCalculator } from "./components/BmiCalculator";

export const AppRoutes = [
  { path: "/", exact: true, label: "Home", component: () => <HomePage /> },
  {
    path: "/bmiCalculator",
    exact: false,
    label: "BMI Calculator",
    component: () => <BmiCalculator />,
  },
];
