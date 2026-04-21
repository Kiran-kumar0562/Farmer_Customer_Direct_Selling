import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Cart.css";

function Cart() {

  const [cart, setCart] = useState({});
  const navigate = useNavigate();


  // Load cart from localStorage
  useEffect(() => {

    const savedCart =
      JSON.parse(localStorage.getItem("cart")) || {};

    setCart(savedCart);

  }, []);


  // Increase quantity
  const increaseQty = (id) => {

    let updatedCart = { ...cart };

    updatedCart[id].quantity += 1;

    localStorage.setItem(
      "cart",
      JSON.stringify(updatedCart)
    );

    setCart(updatedCart);

  };


  // Decrease quantity
  const decreaseQty = (id) => {

    let updatedCart = { ...cart };

    updatedCart[id].quantity -= 1;

    if (updatedCart[id].quantity === 0) {

      delete updatedCart[id];

    }

    localStorage.setItem(
      "cart",
      JSON.stringify(updatedCart)
    );

    setCart(updatedCart);

  };


  // Calculate total amount
  const totalAmount =
    Object.values(cart).reduce(

      (total, item) =>

        total + item.price * item.quantity,

      0

    );


  // Place Order
  const placeOrder = async () => {

    try {

      const token = localStorage.getItem("access");
      if (!token)
        {
          alert("Please login again");
          navigate("/login");
          return;
        }

      const cartItems = Object.values(cart);

      if (cartItems.length === 0) {

        alert("Cart is empty");

        return;

      }

      await axios.post(

        "http://127.0.0.1:8000/api/orders/place/",

        { cart: cartItems },

        {

          headers: {

            Authorization: `Bearer ${token}`,

          },

        }

      );

      alert("Order placed successfully!");

      localStorage.removeItem("cart");

      setCart({});

      navigate("/order-history");

    }

    catch (error) {

      console.error(error);

      alert("Failed to place order");

    }

  };


  return (

    <div className="cart-container">

      <h2>Your Cart</h2>


      {Object.values(cart).length === 0 ? (

        <p>No items in cart</p>

      ) : (

        Object.values(cart).map((item) => (

          <div key={item.id} className="cart-card">

            <img

              src={

                item.image?.startsWith("http")

                  ? item.image

                  : item.image

                  ? `http://127.0.0.1:8000${item.image}`

                  : "/default-product.png"

              }

              alt={item.name}

              className="cart-image"

            />


            <div className="cart-info">

              <h3>{item.name}</h3>

              <p>₹{item.price}</p>


              <div className="qty-controls">

                <button
                  onClick={() => decreaseQty(item.id)}
                >
                  −
                </button>

                <span>{item.quantity}</span>

                <button
                  onClick={() => increaseQty(item.id)}
                >
                  +
                </button>

              </div>


              <p className="subtotal">

                Subtotal ₹

                {item.price * item.quantity}

              </p>

            </div>

          </div>

        ))

      )}


      {/* Bottom-right summary */}

      {Object.values(cart).length > 0 && (

        <div className="cart-summary">

          <h3>Total Amount: ₹{totalAmount}</h3>

          <button
            className="place-order-btn"
            onClick={placeOrder}
          >
            Place Order
          </button>

        </div>

      )}

    </div>

  );

}

export default Cart;