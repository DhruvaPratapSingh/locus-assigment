// frontend/src/pages/Order.js
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export default function Order() {
  const location = useLocation();
  const order = location.state?.order;
  const [timeLeft, setTimeLeft] = useState(15 * 60);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(t => (t > 0 ? t - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Order Placed!</h1>
      <p>Order ID: {order?._id}</p>
      <p>Time left to pay/pickup: {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, "0")}</p>
    </div>
  );
}
