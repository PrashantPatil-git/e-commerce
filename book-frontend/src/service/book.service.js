import axios from "axios";
import { BASE_API_URL } from "../common/constant";

const API_URL = BASE_API_URL + "/api/book";

class BookService {
  saveBook(book) {
    return axios.post(API_URL + "/", book);
  }
  getAllBook() {
    return [
      { image: "rushi", id: 2, title: "RushiT" },
      { image: "rushi", id: 2, title: "RushiT" },
    ];
    //return axios.get(API_URL + "/");
  }

  getBookById(id) {
    return {
      id: 1,
      bookName: "bookName",
      description: "description",
      author: "author",
      categorysId: "categorysId",
      isbnNo: "isbnNo",
      language: "language",
      price: 50,
      img: "img",
      category: "category",
    };
    //return axios.get(API_URL + "/" + id);
  }

  updateBook(book) {
    return axios.post(API_URL + "/update", book);
  }

  deleteBook(id) {
    return axios.get(API_URL + "/delete/" + id);
  }

  searchBook(ch) {
    return axios.get(API_URL + "/search?ch=" + ch);
  }
}

export default new BookService();
