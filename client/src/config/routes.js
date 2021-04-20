import { HomePage } from "../components/pages/HomePage";
import { AccountPage } from "../components/pages/AccountPage";
import { ToolsPage } from "../components/pages/ToolsPage";
import { LogsPage } from "../components/pages/LogsPage";

export const AppRoutes = [
  {
    path: "/",
    exact: true,
    label: "Home",
    authOnly: false,
    component: () => <HomePage />,
  },
  {
    path: "/account",
    exact: false,
    label: "Account",
    authOnly: false,
    component: () => <AccountPage />,
  },
  {
    path: "/tools",
    exact: false,
    label: "Tools",
    authOnly: true,
    component: () => <ToolsPage />,
  },
  {
    path: "/logs",
    exact: false,
    label: "Logs",
    authOnly: true,
    component: () => <LogsPage />,
  },
];
