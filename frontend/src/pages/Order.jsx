import React, { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Order() {
  const location = useLocation();
  const navigate = useNavigate();
  const order = location.state?.order;
  const [timeLeft, setTimeLeft] = useState(15* 60);
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState("");
  const [canceling, setCanceling] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    if (!order?._id) {
      navigate("/");
      return;
    }

    timerRef.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(timerRef.current);
          handleCancel();
          return 0;
        }
        return t - 1;
      });
    }, 1000);

    return () => clearInterval(timerRef.current);
    // eslint-disable-next-line
  }, [order]);

  const formatTime = (seconds) => {
    const m = String(Math.floor(seconds / 60)).padStart(2, "0");
    const s = String(seconds % 60).padStart(2, "0");
    return `${m}:${s}`;
  };

  const handlePayment = async () => {
    if (!order?._id) return;

    setLoading(true);
    setNotification("Processing payment...");
    clearInterval(timerRef.current); // Stop the timer on payment start

    // Simulate payment delay (remove axios for now since you want no backend)
    setTimeout(() => {
      setLoading(false);
      setNotification("✅ Payment successful! Redirecting...");
      setTimeout(() => navigate("/"), 2000);
    }, 3000);
  };

  const handleCancel = async () => {
    if (canceling || !order?._id) return;
    setCanceling(true);
    setNotification("Cancelling order...");
    clearInterval(timerRef.current);
    try {
      await axios.post(`http://localhost:5000/order/${order._id}/cancel`);
      setNotification("⚠ Order canceled. Stock restored.");
      setTimeout(() => navigate("/"), 2000);
    } catch (err) {
      setNotification("❌ Failed to cancel order.",err);
      setCanceling(false);
    }
  };

  return (
    <div className="min-h-screen w-screen flex flex-col items-center justify-center bg-gradient-to-br from-orange-50 to-yellow-100 p-6">
      <div className="bg-white/40 backdrop-blur-md rounded-2xl shadow-xl p-8 text-center max-w-md w-full">
        <h1 className="text-3xl font-bold text-orange-700 mb-4">Payment Page</h1>
        <p className="text-gray-700 mb-2">
          Order ID: <span className="font-mono">{order?._id}</span>
        </p>
        <p className="text-gray-700 mb-6">
          Time left to pay/pickup:{" "}
          <span className="font-mono text-lg text-red-600">{formatTime(timeLeft)}</span>
        </p>

        {notification && (
          <div className="mb-4 text-green-700 font-semibold">{notification}</div>
        )}

        {loading || canceling ? (
          <div className="flex justify-center items-center mb-4">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-green-500"></div>
          </div>
        ) : (
          <div className="flex gap-4 justify-center">
            <button
              onClick={handlePayment}
              className="bg-green-500 hover:bg-green-600 text-black py-2 px-6 rounded-lg font-semibold shadow-md transition"
            >
              💳 Pay Now
            </button>
            <button
              onClick={handleCancel}
              className="bg-red-500 hover:bg-red-600 text-black py-2 px-6 rounded-lg font-semibold shadow-md transition"
            >
              ❌ Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
