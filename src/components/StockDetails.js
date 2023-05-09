import React, { useState, useEffect } from "react";

// Stock details component
const StockDetails = ({ symbol, setStockDataFetched }) => {
  // Declare state variables
  const [stockData, setStockData] = useState(null);
  const [error, setError] = useState(null);

  // Fetch stock data when symbol changes
  useEffect(() => {
    if (symbol) {
      fetchData(symbol);
      setStockDataFetched(true);
    }
  }, [symbol, setStockDataFetched]);

  // Fetch stock data
  const fetchData = async (symbol) => {
    console.log(`Fetching data for ${symbol}`);

    const API_KEY = process.env.REACT_APP_ALPHA_VANTAGE_API_KEY;
    const response = await fetch(
      `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${symbol}&apikey=${API_KEY}`
    );
    if (response.ok) {
      const data = await response.json();
      setStockData(data["Time Series (Daily)"]);
      setError(null);
    } else {
      setStockData(null);
      setError("Failed to fetch stock data. Please try again.");
    }
  };

  // Display stock data
  if (!stockData) {
    return (
      <div>
        {error ? (
          <p style={{ color: "red" }}>{error}</p>
        ) : (
          <p>Loading stock data ...</p>
        )}
      </div>
    );
  }

  // Get entries from stock data object
  const dataEntries = Object.entries(stockData);

  // Return stock details JSX
  return (
    <div>
      <h2>Stock Details</h2>
      <ul>
        {dataEntries.slice(0, 10).map(([date, stockInfo]) => (
          <li key={date}>
            {date}: {stockInfo["5. adjusted close"]}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StockDetails;
