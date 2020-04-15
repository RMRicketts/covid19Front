import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:8081/api/1",
/*  headers: {
    accessToken: "v*T{N.6*7BqjUeU+Ef`J9UTxH%_6WN9~c3;?yqxARy25Te595]~N"
  }*/
});
