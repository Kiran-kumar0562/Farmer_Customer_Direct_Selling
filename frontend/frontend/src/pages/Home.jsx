import React from "react";
import { useNavigate } from "react-router-dom";
import "./HomePage.css";

// Images
import homepagepic from "../assets/images/homepagepic.jpg";
import tomato from "../assets/images/tomato.jpg";
import carrot from "../assets/images/carrot.jpg";
import apple from "../assets/images/applepic.jpg";

function Home() {

  const navigate = useNavigate();

  // Add to Cart
  const handleAddToCart = (product) => {
    try {
      let cart = JSON.parse(localStorage.getItem("cart")) || [];

      cart.push(product);

      localStorage.setItem("cart", JSON.stringify(cart));

      navigate("/cart");
    } catch (error) {
      console.log("Cart error:", error);
    }
  };

  // Static products
  const products = [
    {
      id: 1,
      name: "Tomatoes",
      price: "₹50/kg",
      image: tomato
    },
    {
      id: 2,
      name: "Carrots",
      price: "₹40/kg",
      image: carrot
    },
    {
      id: 3,
      name: "Apple",
      price: "₹200/dozen",
      image: apple
    }
  ];

  return (
    <div>

      {/* HERO SECTION */}
      <div
        className="hero"
        style={{ backgroundImage: `url(${homepagepic})` }}
      >
        <div className="hero-content">

          <h1>Fresh Products Direct From Farmers</h1>

          <p>Buy organic vegetables and fruits directly from farmers</p>

          <button
            className="shop-btn"
            onClick={() => navigate("/products")}
          >
            Shop Now
          </button>

        </div>
      </div>

      {/* FEATURED PRODUCTS */}
      <div className="featured-section">

        <h2>Featured Products</h2>

        <div className="product-grid">

          {/* ✅ Show only 3 products */}
          {products.slice(0, 3).map((product) => (
            <div className="product-card" key={product.id}>

              <img src={product.image} alt={product.name} />

              <h3>{product.name}</h3>

              <p>{product.price}</p>

              <button
                className="cart-btn"
                onClick={() => handleAddToCart(product)}
              >
                Add to Cart
              </button>

            </div>
          ))}

          {/* 🔥 SHOW MORE BUTTON */}
              <button
                className="show-more-btn"
                onClick={() => navigate("/products")}>
                Show More <span className="arrow">→</span>
              </button>
      
        </div>

        

      </div>

    </div>
  );
}

export default Home;