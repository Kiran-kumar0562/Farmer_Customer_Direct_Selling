import React, { useEffect, useState } from "react";
import axios from "axios";
import "./orderHistory.css";

function OrderHistory() {

  const [orders, setOrders] = useState([]);

  useEffect(() => {

    const fetchOrders = async () => {

      try {

        const token = localStorage.getItem("access");

        const response = await axios.get(
          "http://127.0.0.1:8000/api/orders/history/",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // newest orders first (latest on top)
        const sortedOrders = response.data.reverse();

        setOrders(sortedOrders);

      } catch (error) {

        console.log(error);

      }

    };

    fetchOrders();

  }, []);


  return (

    <div className="order-history-container">

      <h2 className="order-title">Your Orders</h2>

      {orders.length === 0 ? (

        <p>No orders found</p>

      ) : (

        orders.map((order) => (

          <div
            key={order.id}
            className="order-card"
          >

            {/* USERNAME */}
            <div className="order-username">
              Username: {order.username}
            </div>

            {/* ORDER ID */}
            <div className="order-id">
              Order ID: {order.id}
            </div>

            {/* ITEMS */}
            {order.items.map((item) => (

              <div
                key={item.id}
                className="order-item"
              >
                {item.product_name} — Qty: {item.quantity}
              </div>

            ))}

            {/* TOTAL */}
            <div className="order-total">
              Total Amount: ₹{order.total_amount}
            </div>

          </div>

        ))

      )}

    </div>

  );

}

export default OrderHistory;