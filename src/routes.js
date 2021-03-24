import { HomePage } from "./components/pages/HomePage";
import { BmiCalculator } from "./components/BmiCalculator";
import { AccountPage } from "./components/pages/AccountPage";

export const AppRoutes = [
  { path: "/", exact: true, label: "Home", component: () => <HomePage /> },
  {
    path: "/account",
    exact: false,
    label: "Account",
    component: () => <AccountPage />,
  },
  {
    path: "/bmiCalculator",
    exact: false,
    label: "BMI Calculator",
    component: () => <BmiCalculator />,
  },
];
