import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Products.css";

const API_BASE = "http://127.0.0.1:8000/api";

function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

   const fetchProducts = async () => {
      try {
        const token = localStorage.getItem("access");

        if (!token) {
          alert("Please login first");
          return;
        }

        const res = await axios.get(`${API_BASE}/products/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log("Products:", res.data);
        setProducts(res.data);

      } catch (error) {
        console.log("ERROR:", error.response?.data);

        if (error.response?.status === 401) {
          alert("Session expired. Please login again.");
          localStorage.clear();
          window.location.href = "/login";
        }
      }
    };

  // ✅ Add to cart (basic version using localStorage)
  const handleAddToCart = (product) => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const existing = cart.find((item) => item.id === product.id);

    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    alert("Added to cart");
  };

  return (
    <div className="products-container">
      <h2>Available Products</h2>

      <div className="product-grid">
        {products.length === 0 ? (
          <p>No products available</p>
        ) : (
          products.map((p) => (
            <div key={p.id} className="product-card">
              <h3>{p.name}</h3>
              <p>{p.description}</p>

              <p className="product-price">₹{p.price}</p>
              <p className="product-qty">Stock: {p.quantity}</p>

              <button
                className="add-cart-btn"
                onClick={() => handleAddToCart(p)}
              >
                Add to Cart
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Products;