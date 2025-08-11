// frontend/src/components/OrderPage.js
import React, { useEffect, useState } from "react";

export default function OrderPage({ orderCreatedAt }) {
  const [timeLeft, setTimeLeft] = useState(15 * 60);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(t => (t > 0 ? t - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div>
      <h2>Complete Payment</h2>
      <p>Time left: {Math.floor(timeLeft / 60)}:{timeLeft % 60}</p>
    </div>
  );
}
