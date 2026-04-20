import React, { useEffect, useState } from "react";
import axios from "axios";
import "./HomePage.css";

const API_BASE = "http://127.0.0.1:8000/api";

function Products() {

  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});

  // 🔥 Load products
  useEffect(() => {

    axios.get(`${API_BASE}/products/`)
      .then((res) => {

        setProducts(res.data);

      })
      .catch((err) => {

        console.log(err);

      });

    // load cart
    const savedCart =
      JSON.parse(localStorage.getItem("cart")) || {};

    setCart(savedCart);

  }, []);


  // update cart helper
  const updateCart = (updatedCart) => {

    localStorage.setItem(
      "cart",
      JSON.stringify(updatedCart)
    );

    setCart(updatedCart);

  };


  // increase quantity
  const increaseQty = (product) => {

    let updatedCart = { ...cart };

    if (updatedCart[product.id]) {

      updatedCart[product.id].quantity += 1;

    } else {

      updatedCart[product.id] = {

        id: product.id,
        name: product.name,
        price: parseFloat(product.price),
        quantity: 1

      };

    }

    updateCart(updatedCart);

  };


  // decrease quantity
  const decreaseQty = (product) => {

    let updatedCart = { ...cart };

    if (!updatedCart[product.id]) return;

    updatedCart[product.id].quantity -= 1;

    if (updatedCart[product.id].quantity === 0) {

      delete updatedCart[product.id];

    }

    updateCart(updatedCart);

  };


  return (

    <div className="featured-section">

      <h2>All Products</h2>

      <div className="product-grid">

        {products.map((product) => {

          const qty =
            cart[product.id]?.quantity || 0;

          return (

            <div
              className="product-card"
              key={product.id}
            >

              <img
                src={
                  product.image
                    ? `http://127.0.0.1:8000${product.image}`
                    : "/default-product.png"
                }
                alt={product.name}
              />

              <h3>{product.name}</h3>

              <p>₹{product.price}</p>


              {

                qty === 0 ? (

                  <button
                    className="cart-btn"
                    onClick={() =>
                      increaseQty(product)
                    }
                  >

                    ADD

                  </button>

                ) : (

                  <div className="qty-controller">

                    <button
                      className="qty-btn"
                      onClick={() =>
                        decreaseQty(product)
                      }
                    >

                      −

                    </button>

                    <span>{qty}</span>

                    <button
                      className="qty-btn"
                      onClick={() =>
                        increaseQty(product)
                      }
                    >

                      +

                    </button>

                  </div>

                )

              }

            </div>

          );

        })}

      </div>

    </div>

  );

}

export default Products;