import axios from "axios";
const instance = axios.create({
  baseURL: "https://burger-9383a-default-rtdb.firebaseio.com/",
});

export default instance;
