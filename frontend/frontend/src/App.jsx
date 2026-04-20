import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import Cart from "./pages/Cart";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Checkout from "./pages/Checkout";
import Orders from "./pages/Orders";
import FarmerDashboard from "./pages/FarmerDashboard";
import Products from "./pages/Products";
import ProtectedRoute from "./routes/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>

      {/* Navbar visible on all pages */}
      <Navbar />

      <Routes>

        {/* Main pages */}
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/cart" element={<Cart />} />

        {/* Authentication */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/farmerdashboard" element={<FarmerDashboard />} />

        {/* Order system */}
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/orders" element={<Orders />} />

        {/* Farmer section */}
        <Route path="/farmer" element={<FarmerDashboard />} />
        <Route path="/Products" element={<Products />} />

              // Farmer dashboard (ONLY FARMER)
              <Route
                path="/farmerdashboard"
                element={
                  <ProtectedRoute role="farmer">
                    <FarmerDashboard />
                  </ProtectedRoute>
                }
              />

              // Products page (ONLY CUSTOMER)
              <Route
                path="/products"
                element={
                  <ProtectedRoute role="customer">
                    <Products />
                  </ProtectedRoute>
                }
              />

      </Routes>

    </BrowserRouter>
  );
}

export default App;