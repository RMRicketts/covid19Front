import axios from "axios";

export const covidTracking = axios.create({
  baseURL: "https://covidtracking.com/api/"
});
