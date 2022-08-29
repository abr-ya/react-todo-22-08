import React from "react";
import ReactDOM from "react-dom/client";
import "regenerator-runtime/runtime";
import "./fonts.css";
import "./body.css";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root") as Element).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
