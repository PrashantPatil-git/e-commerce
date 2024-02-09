import axios from "axios";
import { BASE_API_URL } from "../common/constant";
import { AuthHeader } from "./auth.header";

const API_URL = BASE_API_URL + "/api/bookOrder"

class OrderService {

    createOrder(type) {
        return axios.get(API_URL + "/" + type, { headers: AuthHeader() });
    }

    getOrderByUser() {
        return axios.get(API_URL + "/order", { headers: AuthHeader() });
    }

    getAllOrder() {
        return axios.get(API_URL + "/orders");
    }

    updateOrder(id, st) {
        return axios.get(API_URL + "/updateStatus/"+ id + "/" + st);
    }


}

export default new OrderService();