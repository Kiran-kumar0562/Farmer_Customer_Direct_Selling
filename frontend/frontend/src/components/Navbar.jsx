import React from "react";
import "../css/Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">

      <h2>Farmer Direct Selling System</h2>
    <div className="nav-links">
      <a href="/">Home</a>
      <a href="/products">Products</a>
      <a href="/cart">Cart</a>
      <a href="/login">Login</a>
      <a href="/Register">Register</a>
</div>
    </nav>
   
  );
}

export default Navbar;