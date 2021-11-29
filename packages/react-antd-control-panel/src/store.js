import { createStore, applyMiddleware, compose } from "redux";
import { routerMiddleware, connectRouter } from "connected-react-router";
import { createBrowserHistory } from "history";
import thunk from "redux-thunk";
import { combineReducers } from "@reduxjs/toolkit";

import counterReducer from "./redux/counter/counterSlice";

export const history = createBrowserHistory();

const createRootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    counter: counterReducer,
  });

export const store = function configureStore(preloadedState) {
  const store = createStore(
    createRootReducer(history),
    preloadedState,
    compose(applyMiddleware(routerMiddleware(history), thunk))
  );
  return store;
};
