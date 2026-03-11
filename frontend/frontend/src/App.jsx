import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProductList from "./pages/ProductList";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Orders from "./pages/Orders";
import FarmerDashboard from "./pages/FarmerDashboard";
import AddProduct from "./pages/AddProduct";

function App() {
  return (
    <BrowserRouter>

      <Navbar/>

      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/products" element={<ProductList/>}/>
        <Route path="/cart" element={<Cart/>}/>
        <Route path="/checkout" element={<Checkout/>}/>
        <Route path="/orders" element={<Orders/>}/>
        <Route path="/farmer" element={<FarmerDashboard/>}/>
        <Route path="/add-product" element={<AddProduct/>}/>
      </Routes>

    </BrowserRouter>
  );
}

export default App;
