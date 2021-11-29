import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { ConnectedRouter } from "connected-react-router";
import "antd/dist/antd.css";

import App from "./App";
import "./index.css";
import { store, history } from "./store";

ReactDOM.render(
  <Provider store={store()}>
    <ConnectedRouter history={history}>
      <App history={history} />
    </ConnectedRouter>
  </Provider>,
  document.getElementById("root")
);
