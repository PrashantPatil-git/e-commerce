import axios from "axios";
import { BASE_API_URL } from "../common/constant";
import { AuthHeader } from "./auth.header";

const API_URL = BASE_API_URL;

class CartService {
  addCart(productId, quantity) {
    return axios.put(
      API_URL + "/shopping-carts",
      {
        productId: productId,
        quantity: quantity,
      },
      {
        headers: AuthHeader(),
      }
    );
  }

  checkCart(cart) {
    return axios.post(API_URL + "/check", cart);
  }

  getCart() {
    return {
      data: [
        {
          id: "unique_id_1",
          book: {
            bookName: "Book 1",
            price: 20,
            img: "book1.jpg",
          },
          quantity: 2,
        },
        {
          id: "unique_id_2",
          book: {
            bookName: "Book 2",
            price: 15,
            img: "book2.jpg",
          },
          quantity: 1,
        },
      ],
    };
    //return axios.get(API_URL + "/", { headers: AuthHeader() })
  }

  updateCart(id, qu) {
    return axios.post(API_URL + "/updateQuan/" + id + "/" + qu, {
      headers: AuthHeader(),
    });
  }

  deleteCart(id) {
    return axios.get(API_URL + "/deleteCart/" + id, { headers: AuthHeader() });
  }
}

export default new CartService();
