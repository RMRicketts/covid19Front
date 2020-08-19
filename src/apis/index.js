import axios from "axios";

export const covidTracking = axios.create({
  baseURL: "https://api.covidtracking.com/api/"
});
