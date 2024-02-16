import React from "react";
import "../css/productDetails.css";

import genericbook from "../generic-book.jpg";

const ProductDetails = ({ product }) => {
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
              <strong>Category:</strong> {product.category}
            </p>
            <p>
              <strong>Author:</strong> {product.author}
            </p>
            <p>
              <strong>ISBN:</strong> {product.ISBN}
            </p>
          </div>
          <div>
            <button>Add to Cart</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
