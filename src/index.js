import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./Components/App/app";
import { HashRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store, { persistor } from "./storage/store";
import { PersistGate } from "redux-persist/integration/react";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <HashRouter>
        <App />
      </HashRouter>
    </PersistGate>
  </Provider>
);
