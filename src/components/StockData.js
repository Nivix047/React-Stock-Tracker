import React, { useState, useEffect } from "react";

const StockData = ({ symbol }) => {
  const [stockData, setStockData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const API_KEY = process.env.REACT_APP_ALPHA_VANTAGE_API_KEY;
      const response = await fetch(
        `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${symbol}&apikey=${API_KEY}`
      );
      const data = await response.json();
      setStockData(data);
    };

    if (symbol) {
      fetchData();
    }
  }, [symbol]);

  return (
    <div>
      {stockData ? (
        <pre>{JSON.stringify(stockData, null, 2)}</pre>
      ) : (
        <p>No stock data available</p>
      )}
    </div>
  );
};

export default StockData;
