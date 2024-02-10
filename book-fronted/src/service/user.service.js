import axios from "axios";
import { BASE_API_URL } from "../common/constant";
import { AuthHeader } from "./auth.header";

const API_URL = BASE_API_URL + "/api/auth"

class userService {
    register(user) {

        return axios.post(API_URL + "/register", user);
    }

    login(user) {
        return axios.post(API_URL + "/login", user);
    }
    updateProfile(user) {
        return axios.post(API_URL + "/updateProfile", user, { headers: AuthHeader() });
    }

}

export default new userService();