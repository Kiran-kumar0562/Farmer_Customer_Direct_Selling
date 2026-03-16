import React from "react";
import "./HomePage.css";
import homepagepic from "../assets/images/homepagepic.jpg";

import tomato from "../assets/images/tomato.jpg";
import carrot from "../assets/images/carrot.jpg";
import eggs from "../assets/images/applepic.jpg";
import { useNavigate } from "react-router-dom";

function Home() {

  const navigate = useNavigate();



  const products = [
    {
      id:1,
      name:"Tomatoes",
      price:"₹50/kg",
      image:tomato
    },
    {
      id:2,
      name:"Carrots",
      price:"₹50/kg",
      image:carrot
    },
    {
      id:3,
      name:"Apple",
      price:"₹200/dozen",
      image:eggs
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

          <button className="shop-btn"   onClick={() => navigate("/products")}>Shop Now</button>

        </div>
      </div>


      {/* FEATURED PRODUCTS */}
      <div className="featured-section">

        <h2>Featured Products</h2>

        <div className="product-grid">

          {products.map((product)=>(
            <div className="product-card" key={product.id}>

              <img src={product.image} alt={product.name}/>

              <h3>{product.name}</h3>

              <p>{product.price}</p>

              <button className="cart-btn"  onClick={() => navigate("/cart")}>Add to Cart</button>

            </div>
          ))}

        </div>

      </div>

    </div>
  );
}

export default Home;