import React from "react";
import "../css/productDetails.css";

import genericbook from "../generic-book.jpg";

const ProductDetails = ({ product, addToCart }) => {
  const handleAddToCart = (productId, quantity) => {
    alert(productId, quantity);
    addToCart(productId, quantity);
  };

  const handlePlaceOrder = () => {};

  return (
    <div className="product-card">
      <div>
        <img
          src={product.productImage ? product.productImage : genericbook}
          alt={product.productName}
          className="product-image"
        />
      </div>
      <div>
        <div className="product-details">
          <div>
            <h2>{product.productName}</h2>
            <p>{product.productDescription}</p>
            <p>
              <strong>Price:</strong> ${product.productPrice}
            </p>
            <p>
              <strong>Category:</strong> {product.category.categoryType}
            </p>
            <p>
              <strong>Author:</strong> {product.author}
            </p>
            <p>
              <strong>ISBN:</strong> {product.isbn}
            </p>
            <p>
              <strong>Views:</strong> {product.viewCount}
            </p>
          </div>
          <div>
            <button
              className="btn btn-primary mr-2"
              onClick={() => handleAddToCart(product.productId, 1)}
            >
              Add to Cart
            </button>
            <button
              className="btn btn-success m-2"
              onClick={() => handleAddToCart()}
            >
              Place Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
