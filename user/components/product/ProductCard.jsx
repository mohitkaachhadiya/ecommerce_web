import React from "react";

const ProductCard = ({ product, isAdmin, onOpen, onAddToCart, onEdit, onDelete }) => {
  return (
    <div className="product">
      <div style={{ cursor: "pointer" }} onClick={() => onOpen(product._id)}>
        <img className="img" src={product.proImg} alt={product.proName} />
        <p>{product.proName}</p>
        <p>${product.proPrice}</p>
      </div>

      <button onClick={() => onAddToCart(product._id)}>Add to Cart</button>
      {isAdmin && (
        <>
          <button onClick={() => onEdit(product._id)}>Edit</button>
          <button onClick={() => onDelete(product._id)}>Delete</button>
        </>
      )}
    </div>
  );
};

export default ProductCard;
