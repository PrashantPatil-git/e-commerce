import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Footer } from "../component/footer/Footer";
import BookService from "../service/book.service";

import BookCard from "./BookCard";

import "../css/homePage.css";

const Home = () => {
  const [books, setBooks] = useState([
    {
      productName: "Sample Book",
      productPrice: 10.99,
      productImage: "sample.jpg",
      productDescription:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      category: "Fiction",
      author: "John Doe",
      ISBN: "978-3-16-148410-0",
    },
  ]);

  useEffect(() => {
    // Fetch books data from the server
    BookService.getAllBook()
      .then((res) => {
        console.log(res.data);
        setBooks(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []); // Empty dependency array ensures useEffect runs only once

  return (
    <div>
      <div className="book-cards">
        {books.map((book) => (
          <>
            <BookCard key={book.productId} product={book} />
            <BookCard key={book.productId} product={book} />
          </>
        ))}
      </div>

      {/* Your carousel code */}

      {/* 
      <div className="container mt-5">
        <p className="fs-3 text-center">Books</p>
        <div className="row">
          {books.map((book) => (
            <div className="col-md-3" key={book.productId}>
              <div className="card paint-card">
                <div className="card-body text-center">
                  <img
                    src={book.productImage ? book.productImage : genericbook}
                    height="300px"
                    width="90%"
                    alt={book.title}
                  />

                  <div>
                    <p className="fs-5">
                      <b>Name : </b>
                      {book.productName}
                    </p>
                  </div>
                  <div>
                    <p className="fs-5">
                      <b>Price : </b>
                      {book.productPrice}
                    </p>
                  </div>
                  <div>
                    <Link
                      to={`/book/${book.productId}`}
                      className="btn btn-sm btn-primary"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
       */}
    </div>
  );
};

export { Home };
