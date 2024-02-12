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

    getAllBooks(){

        return [
             { id: 1, title: 'Book 1', author: 'Author 1', price: 10, quantity: 5 },
             { id: 2, title: 'Book 2', author: 'Author 2', price: 15, quantity: 8 },
             { id: 3, title: 'Book 3', author: 'Author 3', price: 20, quantity: 3 },
           ];
     }
     deleteBook(id){
 
     }
  }


export default new sellerService();
