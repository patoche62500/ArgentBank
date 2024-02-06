import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/main.scss";

import Router from "./components/router/router";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router />
  </React.StrictMode>
);
