import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Products.css";

const API_BASE = "http://127.0.0.1:8000/api";

function Products() {

  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState({});

  const role = localStorage.getItem("role"); // ✅ CLEAN WAY

  useEffect(() => {
    fetchProducts();

    const storedCart =
      JSON.parse(localStorage.getItem("cart")) || {};

    setCartItems(storedCart);
  }, []);

  // ---------------- FETCH PRODUCTS ----------------
  const fetchProducts = async () => {
    try {
      const token = localStorage.getItem("access");

      const res = await axios.get(
        `${API_BASE}/products/`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      console.log("Products API response:", res.data);
      setProducts(res.data);

    } catch (err) {
      console.log(err);

      if (err.response?.status === 401) {
        alert("Session expired");
        localStorage.clear();
        window.location.href = "/login";
      }
    }
  };

  // ---------------- CART SAVE ----------------
  const saveCart = (updatedCart) => {
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCartItems(updatedCart);
  };

  // ---------------- ADD TO CART ----------------
  const increaseQty = (product) => {
    const updatedCart = { ...cartItems };

    if (updatedCart[product.id]) {
      updatedCart[product.id].quantity += 1;
    } else {
      updatedCart[product.id] = {
        ...product,
        image: product.image?.startsWith("http")
          ? product.image
          : `http://127.0.0.1:8000${product.image}`,
        quantity: 1
      };
    }

    saveCart(updatedCart);
  };

  // ---------------- DECREASE CART ----------------
  const decreaseQty = (product) => {
    const updatedCart = { ...cartItems };

    if (!updatedCart[product.id]) return;

    updatedCart[product.id].quantity -= 1;

    if (updatedCart[product.id].quantity === 0) {
      delete updatedCart[product.id];
    }

    saveCart(updatedCart);
  };

  // ---------------- UI ----------------
  return (
    <div className="products-container">

      <h2>All Products</h2>

      <div className="product-page-grid">

        {products.map((p) => {

          const qty = cartItems[p.id]?.quantity || 0;

          return (
            <div key={p.id} className="product-card">

              {/* IMAGE */}
              <img
                src={
                  p.image?.startsWith("http")
                    ? p.image
                    : p.image
                      ? `http://127.0.0.1:8000${p.image}`
                      : "/default-product.png"
                }
                alt={p.name}
                className="product-image"
              />

              {/* NAME */}
              <h3>{p.name}</h3>

              {/* PRICE */}
              <p className="product-price">₹{p.price}</p>

              {/* ROLE BASED UI */}
              {role === "farmer" ? (
                <button className="add-cart-btn">
                  Add Product
                </button>
              ) : (
                qty === 0 ? (
                  <button
                    className="add-cart-btn"
                    onClick={() => increaseQty(p)}
                  >
                    ADD TO CART
                  </button>
                ) : (
                  <div className="qty-controller">

                    <button
                      className="qty-btn"
                      onClick={() => decreaseQty(p)}
                    >
                      −
                    </button>

                    <span>{qty}</span>

                    <button
                      className="qty-btn"
                      onClick={() => increaseQty(p)}
                    >
                      +
                    </button>

                  </div>
                )
              )}

            </div>
          );
        })}

      </div>
    </div>
  );
}

export default Products;