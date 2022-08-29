import React from "react";
import ReactDOM from "react-dom/client";
import store from "./store";
import { Provider } from "react-redux";
import "regenerator-runtime/runtime";
import "./fonts.css";
import "./body.css";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root") as Element).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
);
