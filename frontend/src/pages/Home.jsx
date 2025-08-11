// frontend/src/pages/Home.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CartOverlay({ cart, onClose, onPlaceOrder, onQtyChange, onDelete }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-end bg-white/75">
      <div className="bg-white w-full max-w-md h-full shadow-2xl p-6 flex flex-col relative animate-slideInRight">
        <button
          className="absolute top-4 right-4 text-2xl text-orange-500 hover:text-orange-700 focus:outline-none"
          onClick={onClose}
          aria-label="Close cart"
        >
          ×
        </button>
        <h2 className="text-2xl font-bold mb-4 text-orange-700 flex items-center gap-2">
          <span role="img" aria-label="cart">
            🛒
          </span>{" "}
          Cart
        </h2>
        {cart.length === 0 ? (
          <p className="text-gray-500 text-center mt-10">Your cart is empty.</p>
        ) : (
          <>
            <ul className="divide-y divide-orange-100 mb-4 flex-1 overflow-y-auto">
              {cart.map((c, idx) => (
                <li
                  key={idx}
                  className="py-2 flex justify-between items-center gap-2"
                >
                  <span className="font-medium flex-1">{c.name}</span>
                  <div className="flex items-center gap-1">
                    <button
                      className="px-2 py-1 rounded bg-orange-100 text-orange-700 hover:bg-orange-200 font-bold text-lg"
                      onClick={() => onQtyChange(idx, c.quantity - 1)}
                      disabled={c.quantity <= 1}
                    >
                      −
                    </button>
                    <span className="mx-2 w-6 text-center">{c.quantity}</span>
                    <button
                      className="px-2 py-1 rounded bg-orange-100 text-orange-700 hover:bg-orange-200 font-bold text-lg"
                      onClick={() => onQtyChange(idx, c.quantity + 1)}
                      disabled={c.quantity >= c.stock}
                    >
                      +
                    </button>
                  </div>
                  <span className="text-orange-600 font-semibold w-16 text-right">
                    ₹{c.price * c.quantity}
                  </span>
                  <button
                    className="ml-2 text-red-500 hover:text-red-700 text-xl"
                    onClick={() => onDelete(idx)}
                    aria-label="Delete item"
                  >
                    🗑️
                  </button>
                </li>
              ))}
            </ul>
            <div className="flex justify-between items-center mb-4">
              <span className="font-semibold">Total:</span>
              <span className="text-lg text-orange-700 font-bold">
                ₹{cart.reduce((sum, c) => sum + c.price * c.quantity, 0)}
              </span>
            </div>
            <button
              onClick={onPlaceOrder}
              className="w-full py-3 rounded-lg border border-solid border-gray-700 hover:border-amber-600 text-black font-bold text-lg transition"
            >
              Place Order
            </button>
          </>
        )}
      </div>
      <style>{`
        .animate-slideInRight {
          animation: slideInRight 0.3s cubic-bezier(0.4,0,0.2,1);
        }
        @keyframes slideInRight {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
      `}</style>
    </div>
  );
}

export default function Home() {
  const [menu, setMenu] = useState([]);
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchMenu();
  }, []);

  const fetchMenu = async () => {
    const res = await axios.get("http://localhost:5000/menu");
    setMenu(res.data);
  };

  const addToCart = (item) => {
    // If item already in cart, increase quantity
    setCart((prev) => {
      const idx = prev.findIndex((c) => c._id === item._id);
      if (idx !== -1) {
        if (prev[idx].quantity < item.stock) {
          const updated = [...prev];
          updated[idx].quantity += 1;
          return updated;
        }
        return prev;
      }
      return [...prev, { ...item, quantity: 1 }];
    });
    setCartOpen(true);
  };

  const handleQtyChange = (idx, newQty) => {
    setCart((prev) => {
      if (newQty < 1) return prev;
      const updated = [...prev];
      updated[idx].quantity = newQty;
      return updated;
    });
  };

  const handleDelete = (idx) => {
    setCart((prev) => prev.filter((_, i) => i !== idx));
  };

  const placeOrder = async () => {
    if (cart.length === 0) return alert("Cart is empty");
    const items = cart.map((c) => ({ itemId: c._id, quantity: c.quantity }));
    const res = await axios.post("http://localhost:5000/order", { items });
    setCartOpen(false);
    setCart([]);
    navigate(`/order/${res.data._id}`, { state: { order: res.data } });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-100 p-0 w-screen">
      {/* Header */}
      <header className="w-full flex items-center justify-between px-8 py-5 bg-white/80 shadow-md sticky top-0 z-30">
        <h1 className="text-4xl font-bold text-orange-700 flex items-center gap-2 drop-shadow-lg">
          <span role="img" aria-label="menu">
            🍽
          </span>{" "}
          Canteen Menu
        </h1>
        <button
          className="relative text-orange-600 hover:text-orange-800 transition text-3xl focus:outline-none"
          onClick={() => setCartOpen(true)}
          aria-label="Open cart"
        >
          <span role="img" aria-label="cart">
            🛒
          </span>
          {cart.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs rounded-full px-2 py-0.5 font-bold shadow-lg">
              {cart.length}
            </span>
          )}
        </button>
      </header>

      {/* Main Content */}
      <main className="p-6 pt-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {menu.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden transition transform hover:scale-105 hover:shadow-2xl flex flex-col border border-orange-100"
            >
              <img
                src={item.imageUrl || "https://via.placeholder.com/150"}
                alt={item.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-1">
                    {item.name}
                  </h3>
                  <p className="text-orange-600 font-bold text-lg mb-1">
                    ₹{item.price}
                  </p>
                  <p
                    className={`text-sm mb-2 ${
                      item.stock > 0 ? "text-green-600" : "text-red-500"
                    }`}
                  >
                    {item.stock > 0 ? `Stock: ${item.stock}` : "Out of Stock"}
                  </p>
                </div>
                <button
                  onClick={() => addToCart(item)}
                  disabled={item.stock === 0}
                  className={`mt-3 w-full py-2 rounded-lg font-semibold transition text-lg shadow-md ${
                    item.stock > 0
                      ? "bg-orange-500 hover:bg-orange-600 text-black"
                      : "bg-gray-200 text-gray-400 cursor-not-allowed border border-gray-300"
                  }`}
                >
                  {item.stock === 0 ? "Out of Stock" : "Add to Cart"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Cart Overlay */}
      {cartOpen && (
        <CartOverlay
          cart={cart}
          onClose={() => setCartOpen(false)}
          onPlaceOrder={placeOrder}
          onQtyChange={handleQtyChange}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}
