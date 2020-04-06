import api from "../../apis";
import axios from "axios";
import moment from 'moment';

export const getData = query => {
  return async (dispatch, getState) => {
    let response;
    try {
      response = await api.get("getData");
    } catch (e) {
      throw e;
    }
    
    for(let key of Object.keys(response.data.covidData)){
      for(let row of response.data.covidData[key]){
        row.date = moment.utc(row.date).format("MM-DD-YYYY")
      }
    }

    dispatch({
      type: "GETDATA",
      payload: response.data
    });
  };
};

export const login = async creds => {
  return async (dispatch, getState) => {
    const response = await axios.post("login", creds);

    dispatch({
      type: "LOGIN",
      payload: response.data
    });
  };
};
