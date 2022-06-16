import axios from "axios";

export default axios.create({
  baseURL: "https://cryptic-fortress-14262.herokuapp.com/api/v1/restaurants",
});
