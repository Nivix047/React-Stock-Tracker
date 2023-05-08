import React, { useState, useEffect } from "react";

const StockDetails = ({ symbol, setStockDataFetched }) => {
  const [stockData, setStockData] = useState(null);

  useEffect(() => {
    if (symbol) {
      fetchData(symbol);
    }
  }, [symbol]);

  const fetchData = async (symbol) => {
    console.log(`Fetching data for ${symbol}`);

    const API_KEY = process.env.REACT_APP_ALPHA_VANTAGE_API_KEY;
    const response = await fetch(
      `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${symbol}&apikey=${API_KEY}`
    );
    const data = await response.json();
    setStockData(data["Time Series (Daily)"]);
  };

  if (!stockData) {
    return null;
  }

  const dataEntries = Object.entries(stockData);

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
      <button onClick={() => setStockDataFetched(false)}>Close</button>
    </div>
  );
};

export default StockDetails;