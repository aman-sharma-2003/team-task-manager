import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router";
import "./index.css";
import App from "./App.jsx";
import { store } from "./app/store.js";
import { Provider } from "react-redux";


const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
  <BrowserRouter>
    
      <Provider store={store}>
        <App />
      </Provider>
   
  </BrowserRouter>
);
