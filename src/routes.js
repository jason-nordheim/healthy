import { HomePage } from "./components/pages/HomePage";
import { AccountPage } from "./components/pages/AccountPage";
import { ToolsPage } from "./components/pages/ToolsPage";

export const AppRoutes = [
  { path: "/", exact: true, label: "Home", component: () => <HomePage /> },
  {
    path: "/account",
    exact: false,
    label: "Account",
    component: () => <AccountPage />,
  },
  {
    path: "/tools",
    exact: false,
    label: "Tools",
    component: () => <ToolsPage />,
  },
];
