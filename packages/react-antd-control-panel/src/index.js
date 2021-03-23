import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "antd/dist/antd.css";
import App from "./App";

import { createRootStore, history } from "./store";
import { Provider } from "react-redux";
import { ConnectedRouter } from "connected-react-router";

ReactDOM.render(
  <Provider store={createRootStore()}>
    <ConnectedRouter history={history}>
      <App history={history} />
    </ConnectedRouter>
  </Provider>,
  document.getElementById("root")
);
