import React, { useEffect, useState } from "react";
import axios from "axios";
import "./HomePage.css"; // reuse same styling

const API_BASE = "http://127.0.0.1:8000/api";

function Products() {
  const [products, setProducts] = useState([]);

  // 🔥 Fetch products from backend
  useEffect(() => {
    axios.get(`${API_BASE}/products/`)
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // ✅ Add to cart
  const handleAddToCart = (product) => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    cart.push(product);

    localStorage.setItem("cart", JSON.stringify(cart));

    alert("✅ Added to cart");
  };

  return (
    <div className="featured-section">

      <h2>All Products</h2>

      <div className="product-grid">

        {products.map((product) => (
          <div className="product-card" key={product.id}>

            <img
              src={product.image || "https://via.placeholder.com/150"}
              alt={product.name}
            />

            <h3>{product.name}</h3>

            <p>₹{product.price}</p>

            <button
              className="cart-btn"
              onClick={() => handleAddToCart(product)}
            >
              Add to Cart
            </button>

          </div>
        ))}

      </div>

    </div>
  );
}

export default Products;