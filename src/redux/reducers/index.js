import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import getData from "./getData";
import updateState from "./updateState";
import states from "./states";

const createRootReducer = history =>
  combineReducers({
    getData,
    states,
    updateState,
    router: connectRouter(history)
  });

export default createRootReducer;
