import api from "../../apis";
import axios from "axios";
import moment from "moment";

export const getData = query => {
  return async (dispatch, getState) => {
    let response;
    try {
      response = await api.get("getData");
    } catch (e) {
      throw e;
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
    console.log(creds);
    let response;
    try {
      response = await api.post("login", creds);
    } catch (e) {
      console.log(e);
      alert("Failed to login");
      return;
    }

    api.defaults.headers.common["Authorization"] = response.data.accessToken;

    console.log(response.data.accessToken)

    dispatch({
      type: "LOGIN",
      payload: response.data
    });
  };
};

export const create = userInfo => {
  return async (dispatch, getState) => {
    let response;
    try {
      response = await api.post("createUser", userInfo);
    } catch (e) {
      console.log(e);
      alert("user already exists");
      return;
    }

    api.defaults.headers.common["Authorization"] = response.data.accessToken;

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
