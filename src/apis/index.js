import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:8081/api/1",
  headers: {
    Authorization: `Bearer: ${window.sessionStorage.getItem("Authorization")}`
  }
});
