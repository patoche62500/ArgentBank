import React from "react";
import ReactDOM from "react-dom/client";
// Style Css
import "./styles/main.scss";
// React Router
import Router from "./components/router/router";
// Redux
import store from "./store/store";
import { Provider } from "react-redux";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <Router />
    </Provider>
  </React.StrictMode>
);
