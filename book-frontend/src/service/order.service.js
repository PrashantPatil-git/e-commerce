import axios from "axios";
import { BASE_API_URL } from "../common/constant";
import { AuthHeader } from "./auth.header";

const API_URL = BASE_API_URL + "/api/bookOrder"

class OrderService {

    createOrder(type) {
        return axios.get(API_URL + "/" + type, { headers: AuthHeader() });
    }

    getOrderByUser() {

        return [
            
               {
                book: {
                  img: "image_url",
                  bookName: "Book Name",
                  author: "Author Name",
                  isbnNo: "ISBN Number",
                  category: {
                    categoryName: "Category Name"
                  }
                },
                orderNumber: "Order Number",
                quantity: "Quantity",
                paymentType: "Payment Type",
                status: "Status"
              }
            
            // Add more objects for additional items in the orderList array
          ];
          
        //return axios.get(API_URL + "/order", { headers: AuthHeader() });
    }

    getAllOrder() {
        return axios.get(API_URL + "/orders");
    }

    updateOrder(id, st) {
        return axios.get(API_URL + "/updateStatus/"+ id + "/" + st);
    }


}

export default new OrderService();