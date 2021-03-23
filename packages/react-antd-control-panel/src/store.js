import { createStore, applyMiddleware, compose } from "redux";
import createRootReducer from "./reducers";
import { routerMiddleware } from "connected-react-router";
import { createBrowserHistory } from "history";

export const history = createBrowserHistory();

export function createRootStore(initialState) {
  const store = createStore(
    createRootReducer(history),
    initialState,
    compose(applyMiddleware(routerMiddleware(history)))
  );
  return store;
}
