import {
  HomePage,
  AccountPage,
  ToolsPage,
  LogsPage,
} from "../components/pages";

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
