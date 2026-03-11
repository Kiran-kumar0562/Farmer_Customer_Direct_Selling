import React from "react";

function ProductCard({ product }) {

  return (
    <div>

      <h3>{product.name}</h3>

      <p>Price: ₹{product.price}</p>

      <button>Add To Cart</button>

    </div>
  );

}

export default ProductCard;