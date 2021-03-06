import { createStore, applyMiddleware, compose } from "redux";
import { routerMiddleware } from "connected-react-router";
import thunk from "redux-thunk";
import { createBrowserHistory } from "history";
import createRootReducer from "./reducers";

export const history = createBrowserHistory();

const middleware = [thunk, routerMiddleware(history)];

let enhancers = [];

if (process.env.NODE_ENV === "development") {
  const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__;
  if (typeof devToolsExtension === "function") {
    enhancers.push(devToolsExtension());
  }
}

const composedEnhancers = compose(
  applyMiddleware(...middleware),
  ...enhancers
);

let initialState = {
  getData: {
    data: []
  },
  updateState: {
    state: "",
    label: ""
  },
  states: {
    states: []
  }
}

export default createStore(
  createRootReducer(history),
  initialState,
  composedEnhancers
);
