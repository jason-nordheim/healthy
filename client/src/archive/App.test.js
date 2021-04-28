import { App } from "./App";
import { render, screen } from "@testing-library/react";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import "@testing-library/jest-dom/extend-expect";
import { AppName } from "../config/app.config";

describe("App Tests", () => {
  test("Renders without crashing", () => {
    const history = createMemoryHistory();
    const { debug } = render(
      <Router history={history}>
        <App />
      </Router>
    );
    debug();
    const navigation = screen.getByRole("navigation");
    const title = screen.getByText(`${AppName}`);
    expect(navigation).toBeInTheDocument();
    expect(title).toBeInTheDocument();
    expect(title.tagName).toBe("H1");
  });
});
