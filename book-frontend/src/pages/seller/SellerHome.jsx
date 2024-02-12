import React, { useEffect, useState } from 'react';
import Book from '../../model/Book';
import sellerService from '../../service/seller.service';
//import Book from './Book'; // Assuming you have a Book component

const SellerHome = () => {
    //storing the list of all books of seller
  const [books, setBooks] = useState([]);
  //for storing new new book that seller will add
  const [newBook, setNewBook] = useState(new Book("","","","","","","","","","",""));

  const [showAddForm, setShowAddForm] = useState(false);


  useEffect(()=>{
    setBooks(sellerService.getAllBooks());


  },[]);

  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewBook({ ...newBook, [name]: value });
  };

  // function that will add new book
  const handleAddBook = () => {
    
    console.log(newBook)
    sellerService.addBook(newBook);
    setNewBook(new Book("","","","","","","","","","",""));
    setShowAddForm(false);
  };

  const handleQuantityChange = (id, newQuantity) => {
    setBooks(
      books.map((book) =>
        book.id === id ? { ...book, quantity: newQuantity } : book
      )
    );
  };

  const handleDeleteBook = (id) => {
    setBooks(books.filter((book) => book.id !== id));
    sellerService.deleteBook(id);
  };

  return (
    <div className="container-fluid p-5">
      <div className="row">
        <div className="col-md-8">
          <table className="table">
            <thead className="text-center bg-light">
              <tr>
                <th scope="col">Title</th>
                <th scope="col">Author</th>
                <th scope="col">Price</th>
                <th scope="col">Quantity</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {books.map((book) => (
                <tr key={book.id}>
                  <td>{book.title}</td>
                  <td>{book.author}</td>
                  <td>{book.price}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-dark me-1"
                      onClick={() => handleQuantityChange(book.id, book.quantity - 1)}
                    >
                      -
                    </button>
                    {book.quantity}
                    <button
                      className="btn btn-sm btn-dark ms-1"
                      onClick={() => handleQuantityChange(book.id, book.quantity + 1)}
                    >
                      +
                    </button>
                  </td>
                  <td>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDeleteBook(book.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button className="btn btn-primary" onClick={() => setShowAddForm(true)}>
            Add New Book
          </button>
          {showAddForm && (
            <div className="mt-3">
              <h2>Add New Book</h2>
              <div className="mb-3">
                <label>Title:</label>
                <input
                  type="text"
                  className="form-control"
                  name="title"
                  value={newBook.title}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-3">
                <label>Author:</label>
                <input
                  type="text"
                  className="form-control"
                  name="author"
                  value={newBook.author}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-3">
                <label>Price:</label>
                <input
                  type="text"
                  className="form-control"
                  name="price"
                  value={newBook.price}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-3">
                <label>Quantity:</label>
                <input
                  type="text"
                  className="form-control"
                  name="quantity"
                  value={newBook.quantity}
                  onChange={handleInputChange}
                />
              </div>
              <button className="btn btn-success" onClick={handleAddBook}>
                Add Book
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SellerHome;
