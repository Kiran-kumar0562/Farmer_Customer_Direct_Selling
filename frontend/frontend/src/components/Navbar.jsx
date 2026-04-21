import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../css/Navbar.css";

function Navbar() {

  const navigate = useNavigate();

  const [token, setToken] = useState(localStorage.getItem("access"));
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user"))
  );
  const [role, setRole] = useState(localStorage.getItem("role"));


  // 🔄 Sync storage on mount + login/logout updates
  useEffect(() => {

    const updateUser = () => {

      const storedUser = localStorage.getItem("user");
      const storedToken = localStorage.getItem("access");
      const storedRole = localStorage.getItem("role");

      if (storedUser && storedUser !== "undefined") {
        setUser(JSON.parse(storedUser));
      } else {
        setUser(null);
      }

      setToken(storedToken);
      setRole(storedRole);
    };

    // initial load
    updateUser();

    // listen for login/logout updates
    window.addEventListener("authChange", updateUser);

    return () => {
      window.removeEventListener("authChange", updateUser);
    };

  }, []);


  // 🔐 ROLE BASED DASHBOARD NAVIGATION
  const goToDashboard = () => {

    if (role === "farmer") {
      navigate("/farmerdashboard");
    } else {
      navigate("/products");
    }

  };


  // 🔴 LOGOUT FUNCTION
  const handleLogout = () => {

    localStorage.clear();

    window.dispatchEvent(new Event("authChange"));

    navigate("/login");

  };


  return (

    <nav className="navbar">

      <h2>Farmer Direct Selling System</h2>

      <div className="nav-links">

        <Link to="/">Home</Link>

        {/* CUSTOMER NAVIGATION */}
        {role === "customer" && (
          <>
            <Link to="/products">Products</Link>
            <Link to="/cart">Cart</Link>
            <Link to="/order-history">Orders</Link>
          </>
        )}

        {/* FARMER NAVIGATION */}
        {role === "farmer" && (
          <>
            <Link to="/farmerdashboard">Dashboard</Link>
          </>
        )}


        {/* AUTH SECTION */}
        {token && user ? (
          <>
            <span
              className="username"
              onClick={goToDashboard}
              style={{ cursor: "pointer", fontWeight: "bold" }}
            >
              👋 Welcome, {user.username}
            </span>

            <button
              onClick={handleLogout}
              className="logout-btn"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}

      </div>

    </nav>

  );

}

export default Navbar;