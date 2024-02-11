import axios from "axios";
import { BASE_API_URL } from "../common/constant";

const API_URL = BASE_API_URL + "/authenticate";

class sellerService {
  register(values) {
    return axios.post(API_URL + "/seller/register", {
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      passWord: values.passWord,
      panNumber: values.panNumber,
      mobileNumber: values.mobileNumber,
    });
  }
}

export default new sellerService();
