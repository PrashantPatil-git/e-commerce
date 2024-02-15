import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Footer } from "../component/footer/Footer";
import BookService from "../service/book.service";

const Home = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    // Fetch books data from the server
    setBooks(BookService.getAllBook());
  }, []); // Empty dependency array ensures useEffect runs only once

  return (
    <div>
      {/* Your carousel code */}
      <div className="container">
        <p className="fs-3 text-center">Books</p>
        <div className="row">
          {books.map((book) => (
            <div className="col-md-3" key={book.id}>
              <div className="card paint-card">
                <div className="card-body text-center">
                  <img
                    src={book.image}
                    height="300px"
                    width="90%"
                    alt={book.title}
                  />
                  <p className="fs-5">{book.title}</p>
                  <Link
                    to={`/ViewBook/${book.id}`}
                    className="btn btn-sm btn-primary"
                  >
                    View Details
                  </Link>
                  <Link
                    to={`/ViewBook/${book.price}`}
                    className="btn btn-sm btn-danger ms-2"
                  >
                    {book.price}
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export { Home };
