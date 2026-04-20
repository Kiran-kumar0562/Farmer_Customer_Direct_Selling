import React, { useEffect, useState , useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Farmerdashboard.css";

const API_BASE = "http://127.0.0.1:8000/api";

function FarmerDashboard() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [products, setProducts] = useState([]);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("");
  const fileInputRef = useRef(null);

  // ✅ NEW: image state
  const [image, setImage] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("access");
    const storedUser = localStorage.getItem("user");

    if (!token || !storedUser || storedUser === "undefined") {
      navigate("/login");
      return;
    }

    try {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      fetchProducts(token);
    } catch {
      localStorage.clear();
      navigate("/login");
    }
  }, [navigate]);

  // ✅ Fetch products
  const fetchProducts = async (tokenParam) => {
    try {
      const token = tokenParam || localStorage.getItem("access");

      const res = await axios.get(`${API_BASE}/products/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setProducts(res.data);
    } catch (error) {
      if (error.response?.status === 401) {
        localStorage.clear();
        navigate("/login");
      }
    }
  };

  // ✅ Add product WITH IMAGE
  const handleAddProduct = async () => {
    if (!name || !price) {
      alert("Enter product details");
      return;
    }

    try {
      const formData = new FormData();

      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", Number(price));
      formData.append("quantity", Number(quantity));
      formData.append("image", image); // 🔥 important

      await axios.post(`${API_BASE}/products/add/`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access")}`,
          "Content-Type": "multipart/form-data",
        },
      });

      // reset form
      setName("");
      setPrice("");
      setDescription("");
      setQuantity("");
      setImage(null);
      
            // 🔥 clear file input UI
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      fetchProducts();
    } catch (error) {
      console.log("Error:", error.response?.data);
    }
  };

  // ✅ Delete product
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_BASE}/products/delete/${id}/`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access")}`,
        },
      });

      fetchProducts();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="dashboard-container">

      {/* Farmer Profile */}
      {user && (
        <div className="farmer-card">
          <h2>👨‍🌾 Farmer Profile</h2>
          <p><strong>ID:</strong> {user.id}</p>
          <p><strong>Username:</strong> {user.username}</p>
        </div>
      )}

      {/* Add Product */}
      <div className="add-product-card">
        <h3>Add Product</h3>

        <input
          type="text"
          placeholder="Product name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <input
          type="number"
          placeholder="Quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />

        {/* 🔥 IMAGE INPUT */}
        <input
          type="file"
          ref={fileInputRef}
          onChange={(e) => setImage(e.target.files[0])}
        />

        <button onClick={handleAddProduct}>Add</button>
      </div>

      {/* Product List */}
      <div className="product-list">
        <h2>Your Products</h2>

        {products.length === 0 ? (
          <p>No products yet</p>
        ) : (
          products.map((p) => (
            <div key={p.id} className="product-card">

              {/* 🔥 SHOW IMAGE */}
              {p.image && (
                <img
                  src={p.image.startsWith("http") 
                    ? p.image 
                    : `http://127.0.0.1:8000${p.image}`
                  }
                  alt={p.name}
                  className="product-img"
                />
              )}

              <p><strong>{p.name}</strong></p>
              <p>₹{p.price}</p>

              {user && p.farmer === user.id && (
                <button onClick={() => handleDelete(p.id)}>
                  Delete
                </button>

              )}
            </div>
          ))
        )}
      </div>

    </div>
  );
}

export default FarmerDashboard;