// frontend/src/components/Menu.js
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Menu() {
  const [menu, setMenu] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/menu").then(res => setMenu(res.data));
  }, []);

  return (
    <div>
      <h2>Menu</h2>
      {menu.map(item => (
        <div key={item._id}>
          {item.name} - ${item.price} - Stock: {item.stock}
          <button disabled={item.stock === 0}>Add to Cart</button>
        </div>
      ))}
    </div>
  );
}
