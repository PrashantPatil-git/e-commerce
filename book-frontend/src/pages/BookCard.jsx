import React, { useEffect } from "react";
import "../css/bookCard.css";
import genericbook from "../generic-book.jpg";

const Card = ({ product }) => {
  return (
    <div className="card">
      <img
        src={product.productImage ? product.productImage : genericbook}
        alt={product.productName}
      />
      <div className="card-body">
        <h2>{product.productName}</h2>
        <p>{product.productDescription}</p>
        <p>
          <strong>Price:</strong> ${product.productPrice}
        </p>
        <p>
          <strong>Category:</strong> {product.category.type}
        </p>
        <p>
          <strong>Author:</strong> {product.author}
        </p>
        <p>
          <strong>ISBN:</strong> {product.isbn}
        </p>
      </div>
    </div>
  );
};

export default Card;
