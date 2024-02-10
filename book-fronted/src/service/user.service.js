import axios from "axios";
import { BASE_API_URL } from "../common/constant";

const API_URL = BASE_API_URL + "/authenticate";

class userService {
  register(user) {
    return axios.post(API_URL + "/user/signup", user);
  }

  login(user) {
    return axios.post(API_URL + "/user/login", {
      email: user.email,
      passWord: user.passWord,
    });
  }
}

export default new userService();
