import React from "react";
import ReactDOM from "react-dom";
import { BmiCalculator } from "./components/BmiCalculator";
import { NavBar } from "./components/layout/nav/NavBar";
import { BrowserRouter as Router, Route } from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <NavBar />
    <Router>
      <Route to="/">
        <BmiCalculator />
      </Route>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
