import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import getData from "./getData";
import login from "./login";

const createRootReducer = history =>
  combineReducers({
    login,
    getData,
    router: connectRouter(history)
  });

export default createRootReducer;
