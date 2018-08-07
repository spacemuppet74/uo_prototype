import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "mobx-react";
import { HashRouter as Router } from "react-router-dom";

const el = document.getElementById("root");

import RootStore from "./store/rootstore";
import App from "./App";

const store = new RootStore();

// Global CSS
import "semantic-ui-css/semantic.min.css";
import "./index.css";

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  el
);
