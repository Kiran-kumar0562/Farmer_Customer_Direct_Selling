import React, { useEffect, useState } from "react";
import "./Cart.css";

function Cart() {
  const [cart, setCart] = useState([]);

  // 🔥 Load cart data
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  // ❌ Remove item
  const handleRemove = (index) => {
    const updatedCart = [...cart];
    updatedCart.splice(index, 1);

    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCart(updatedCart);
  };

  // 💰 Calculate total
  const getTotal = () => {
    return cart.reduce((total, item) => {
      return total + Number(item.price.replace(/[^0-9]/g, ""));
    }, 0);
  };

  return (
    <div className="cart-container">

      <h2>Your Cart</h2>

      {cart.length === 0 ? (
        <p>No items in cart</p>
      ) : (
        <>
          {cart.map((item, index) => (
            <div className="cart-card" key={index}>

              <img
                src={item.image || "https://via.placeholder.com/100"}
                alt={item.name}
              />

              <div className="cart-info">
                <h3>{item.name}</h3>
                <p>{item.price}</p>
              </div>

              <button onClick={() => handleRemove(index)}>
                Remove
              </button>

            </div>
          ))}

          <h3 className="total">Total: ₹{getTotal()}</h3>
        </>
      )}

    </div>
  );
}

export default Cart;