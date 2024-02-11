import axios from "axios";
import { BASE_API_URL } from "../common/constant";

const API_URL = BASE_API_URL + "/authenticate";

class userService {
  register(user) {
    // return axios.post(API_URL + "/user/signup", user);

    // register the user using user attributes
    // post request on authentication-service
    return axios.post(API_URL + "/user/signup", {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      passWord: user.passWord,
      mobileNumber: user.mobileNumber,
    });
  }

  login(user) {
    return axios.post(API_URL + "/user/login", {
      email: user.email,
      passWord: user.passWord,
    });
  }

  updateprofile(user){

    

  }
}

export default new userService();
