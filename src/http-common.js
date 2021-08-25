import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:1919/management",
  headers: {
    "Content-type": "application/json"
  }
});