import React from "react";
import ReactDOM from "react-dom/client";
import "./style.css";
import App from "./App";
import { BrowserRouter, HashRouter } from "react-router-dom";
import Userprovider from "./pages/Website/context/Usercontext";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <HashRouter>
    <Userprovider>
      <App />
    </Userprovider>
  </HashRouter>
);
