import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import { App } from "./components/App";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Switch>
        <App />
      </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
