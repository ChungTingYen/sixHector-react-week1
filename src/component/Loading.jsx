import React, { useState, useEffect } from "react";

const LoadingDots = () => {
  const [dots, setDots] = useState(1);

  useEffect(() => {
    const intervalId = setInterval(
      () => setDots((prev) => (prev < 5 ? prev + 1 : 1)),
      500
    );

    return () => clearInterval(intervalId);
  }, []);

  return <h2 className="h2 text-center">產品列表載入中{".".repeat(dots)}</h2>;
};

export default LoadingDots;
