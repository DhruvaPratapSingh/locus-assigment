// frontend/src/components/Menu.js
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Menu() {
  const [menu, setMenu] = useState([]);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const res = await axios.get("http://localhost:5000/menu");
        setMenu(res.data);
      } catch (err) {
        console.error("Error fetching menu:", err);
      }
    };
    fetchMenu();
  }, []);

  return (
    <div className="ui-min-h-screen ui-bg-gradient-to-br ui-from-orange-50 ui-to-yellow-100 ui-p-6">
      <h2 className="ui-text-4xl ui-font-bold ui-text-center ui-mb-8 ui-text-orange-700">
        🍽 Canteen Menu
      </h2>

      <div className="ui-grid ui-grid-cols-1 sm:ui-grid-cols-2 md:ui-grid-cols-3 lg:ui-grid-cols-4 ui-gap-6">
        {menu.map((item) => (
          <div
            key={item._id}
            className="ui-bg-white ui-rounded-2xl ui-shadow-lg ui-overflow-hidden ui-transition ui-transform hover:ui-scale-105 hover:ui-shadow-xl"
          >
            <img
              src="https://www.foodandwine.com/thmb/DI29Houjc_ccAtFKly0BbVsusHc=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/crispy-comte-cheesburgers-FT-RECIPE0921-6166c6552b7148e8a8561f7765ddf20b.jpg"
              alt={item.name}
              className="ui-w-full ui-h-48 ui-object-cover"
            />
            <div className="ui-p-4">
              <h3 className="ui-text-lg ui-font-semibold ui-text-gray-800">
                {item.name}
              </h3>
              <p className="ui-text-orange-600 ui-font-bold ui-text-lg">
                ₹{item.price}
              </p>
              <p
                className={`ui-text-sm ${
                  item.stock > 0 ? "ui-text-green-600" : "ui-text-red-500"
                }`}
              >
                {item.stock > 0
                  ? `Stock: ${item.stock}`
                  : "Out of Stock"}
              </p>

              <button
                disabled={item.stock === 0}
                className={`ui-mt-3 ui-w-full ui-py-2 ui-rounded-lg ui-text-white ui-font-semibold ui-transition ${
                  item.stock > 0
                    ? "ui-bg-orange-500 hover:ui-bg-orange-600"
                    : "ui-bg-gray-400 cursor-not-allowed"
                }`}
              >
                {item.stock > 0 ? "Add to Cart" : "Unavailable"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
