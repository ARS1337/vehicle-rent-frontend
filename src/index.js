import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Route, Routes } from "react-router";
import FormIntroName from "./forms/FormIntroName";
import Wheels from "./forms/Wheels";
import Type from "./forms/Type";
import Model from "./forms/Model";
import DateRange from "./forms/DateRange";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <Routes>
      <Route  element={<App />} >
      <Route path="/" element={<FormIntroName />} />
      <Route path="/wheels" element={<Wheels />} />
      <Route path="/type" element={<Type />} />
      <Route path="/model" element={<Model />} />
      <Route path="/date-range" element={<DateRange />} />
      </Route>
    </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
