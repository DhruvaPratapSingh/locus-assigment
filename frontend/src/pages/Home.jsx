// frontend/src/pages/Home.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [menu, setMenu] = useState([]);
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchMenu();
  }, []);

  const fetchMenu = async () => {
    const res = await axios.get("http://localhost:5000/menu");
    setMenu(res.data);
  };

  const addToCart = (item) => {
    setCart((prev) => [...prev, { ...item, quantity: 1 }]);
  };

  const placeOrder = async () => {
    if (cart.length === 0) return alert("Cart is empty");

    const items = cart.map(c => ({ itemId: c._id, quantity: c.quantity }));
    const res = await axios.post("http://localhost:5000/order", { items });

    navigate(`/order/${res.data._id}`, { state: { order: res.data } });
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Canteen Menu</h1>
      {menu.map(item => (
        <div key={item._id} style={{
          border: "1px solid #ccc",
          padding: "10px",
          marginBottom: "10px"
        }}>
          <h3>{item.name}</h3>
          <p>Price: ${item.price}</p>
          <p>Stock: {item.stock}</p>
          <button
            onClick={() => addToCart(item)}
            disabled={item.stock === 0}
          >
            {item.stock === 0 ? "Out of Stock" : "Add to Cart"}
          </button>
        </div>
      ))}

      {cart.length > 0 && (
        <div style={{ marginTop: "20px" }}>
          <h2>Cart</h2>
          {cart.map((c, idx) => (
            <p key={idx}>{c.name} x {c.quantity}</p>
          ))}
          <button onClick={placeOrder}>Place Order</button>
        </div>
      )}
    </div>
  );
}
