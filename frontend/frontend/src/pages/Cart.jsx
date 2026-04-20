import React, { useEffect, useState } from "react";

function Cart() {

  const [cart, setCart] = useState({});

  useEffect(() => {
    const savedCart =
      JSON.parse(localStorage.getItem("cart")) || {};

    setCart(savedCart);
  }, []);


  // increase quantity
  const increaseQty = (id) => {
    let updatedCart = { ...cart };

    updatedCart[id].quantity += 1;

    localStorage.setItem(
      "cart",
      JSON.stringify(updatedCart)
    );

    setCart(updatedCart);
  };


  // decrease quantity
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


  // total price
  const totalPrice =
    Object.values(cart).reduce(
      (total, item) =>
        total + item.price * item.quantity,
      0
    );


  return (
    <div style={{ padding: "20px" }}>

      <h2>Your Cart</h2>

      {Object.values(cart).length === 0 ? (
        <p>No items in cart</p>
      ) : (
        Object.values(cart).map((item) => (
          <div
            key={item.id}
            style={{
              border: "1px solid #ddd",
              padding: "15px",
              marginBottom: "15px",
              display: "flex",
              alignItems: "center",
              gap: "15px"
            }}
          >

            {/* ✅ PRODUCT IMAGE */}
            <img
              src={
                item.image?.startsWith("http")
                  ? item.image
                  : item.image
                    ? `http://127.0.0.1:8000${item.image}`
                    : "/default-product.png"
              }
              alt={item.name}
              style={{
                width: "90px",
                height: "90px",
                objectFit: "cover",
                borderRadius: "8px"
              }}
            />

            {/* DETAILS */}
            <div style={{ flex: 1 }}>

              <h3 style={{ margin: "0 0 5px" }}>
                {item.name}
              </h3>

              <p>₹{item.price}</p>

              {/* QUANTITY CONTROLS */}
              <div>
                <button onClick={() => decreaseQty(item.id)}>
                  −
                </button>

                <span style={{ margin: "0 10px" }}>
                  {item.quantity}
                </span>

                <button onClick={() => increaseQty(item.id)}>
                  +
                </button>
              </div>

              <p>
                Subtotal = ₹
                {item.price * item.quantity}
              </p>

            </div>

          </div>
        ))
      )}

      <h2>Total Amount: ₹{totalPrice}</h2>

    </div>
  );
}

export default Cart;