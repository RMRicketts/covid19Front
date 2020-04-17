import api from "../../apis";
import moment from "moment";
import jwt from "jsonwebtoken";
import { history } from "../store.js";

export const getData = query => {
  return async (dispatch, getState) => {
    let response;
    try {
      response = await api.get("getData");
    } catch (e) {
      console.log(e);
      history.push("/login");
      return;
    }

    for (let key of Object.keys(response.data.covidData)) {
      for (let row of response.data.covidData[key]) {
        row.date = moment.utc(row.date).format("MM-DD-YYYY");
      }
    }

    dispatch({
      type: "GETDATA",
      payload: response.data
    });
  };
};

export const login = creds => {
  return async (dispatch, getState) => {
    window.sessionStorage.removeItem("Authorization");
    window.sessionStorage.removeItem("exp");
    let response;
    try {
      response = await api.post("login", creds);
    } catch (e) {
      console.log(e);
      alert("Failed to login");
      return;
    }

    let accessToken = response.data.accessToken;
    api.defaults.headers["Authorization"] = `Bearer ${accessToken}`;
    window.sessionStorage.setItem("Authorization", accessToken);
    let { exp } = jwt.decode(accessToken);
    window.sessionStorage.setItem("exp", exp);

    history.push("/reports/United States");

    dispatch({
      type: "LOGIN",
      payload: { loggedIn: true }
    });
  };
};

export const create = userInfo => {
  return async (dispatch, getState) => {
    window.sessionStorage.removeItem("Authorization");
    window.sessionStorage.removeItem("exp");
    let response;
    try {
      response = await api.post("createUser", userInfo);
    } catch (e) {
      console.log(e);
      alert("user already exists");
      return;
    }

    let accessToken = response.data.accessToken;
    api.defaults.headers["Authorization"] = `Bearer ${accessToken}`;
    window.sessionStorage.setItem("Authorization", accessToken);
    let { exp } = jwt.decode(accessToken);
    window.sessionStorage.setItem("exp", exp);

    history.push("/reports/United States");

    dispatch({
      type: "LOGIN",
      payload: response.data
    });
  };
};

export const loadStates = data => {
  return {
    type: "LOAD_STATES",
    payload: {
      states: Object.keys(data).sort()
    }
  };
};

export const updateState = name => {
  return {
    type: "UPDATE_STATE",
    payload: {
      state: name
    }
  };
};
